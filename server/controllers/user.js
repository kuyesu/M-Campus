const User = require("../models/UserModel");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken.js");
const cloudinary = require("cloudinary");
const Notification = require("../models/NotificationModel");
const {
  sendNewEmail,
  verifyOTPNewEmail,
} = require("../controllers/verifyNewEmail");

// VerifyEmail
exports.verifyEmail = catchAsyncErrors(async (req, res, next) => {
  const { userId, code } = req.body;
  if (!userId || !code) {
    return res.status(400).json({ success: false, message: "Something wnet wrong, missing parameters" });
  }
  // check if user exists
  if (!User.findById(userId)) {
    return res.status(400).json({ success: false, message: "Something wnet wrong, user not found" });
  }

  // check if email address is already taken
  if (User.email === email) {
    return res.status(400).json({ success: false, message: "Email address already taken" });
  }

  // check if user already verified
  if (User.verificationCode.userId === userId) {
    return res.status(400).json({ success: false, message: "User already verified" });
  }

  // check if code is correct
  if (User.verificationCode.code !== code) {
    return res.status(400).json({ success: false, message: "Incorrect code" });
  }

  // update user
  User.verificationCode.userId = userId;
})

// Register user
exports.createUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    // let myCloud;
    // if (avatar) {
    //   myCloud = await cloudinary.v2.uploader.upload(avatar, {
    //     folder: "avatars",
    //   });
    // }
    const userNameWithoutSpace = name.replace(/\s/g, "");
    const uniqueNumber = Math.floor(Math.random() * 1000);

    user = await User.create({
      name,
      email,
      phone,
      userName: userNameWithoutSpace + uniqueNumber,
      // avatar: avatar
      //   ? { public_id: myCloud.public_id, url: myCloud.secure_url }
      //   : null,
    });

    await sendNewEmail(email);

    sendToken(user, 201, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter the email & password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new ErrorHandler("User is not found with this email & password", 401)
    );
  }

  // check is user is verified
  if (!user.verified) {
    throw new ErrorHandler("Please verify your email", 401);
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(
      new ErrorHandler("User is not find with this email & password", 401)
    );
  }

  sendToken(user, 201, res);
});

//  Log out user
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.status(200).json({
    success: true,
    message: "Log out success",
  });
});

//  Get user Details
exports.userDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// get all users
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const loggedInuser = req.user.id;
  const users = await User.find({ _id: { $ne: loggedInuser } }).sort({
    createdAt: -1,
  });

  res.status(201).json({
    success: true,
    users,
  });
});

// Follow and unfollow user
exports.followUnfollowUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const loggedInUser = req.user;
    const { followUserId } = req.body;

    const isFollowedBefore = loggedInUser.following.find(
      (item) => item.userId === followUserId
    );
    const loggedInUserId = loggedInUser._id;

    if (isFollowedBefore) {
      await User.updateOne(
        { _id: followUserId },
        { $pull: { followers: { userId: loggedInUserId } } }
      );

      await User.updateOne(
        { _id: loggedInUserId },
        { $pull: { following: { userId: followUserId } } }
      );

      await Notification.deleteOne({
        "creator._id": loggedInUserId,
        userId: followUserId,
        type: "Follow",
      });

      res.status(200).json({
        success: true,
        message: "User unfollowed successfully",
      });
    } else {
      await User.updateOne(
        { _id: followUserId },
        { $push: { followers: { userId: loggedInUserId } } }
      );

      await User.updateOne(
        { _id: loggedInUserId },
        { $push: { following: { userId: followUserId } } }
      );

      await Notification.create({
        creator: req.user,
        type: "Follow",
        title: "Followed you",
        userId: followUserId,
      });

      res.status(200).json({
        success: true,
        message: "User followed successfully",
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 401));
  }
});

// get user notification
exports.getNotification = catchAsyncErrors(async (req, res, next) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id }).sort(
      { createdAt: -1 }
    );

    res.status(201).json({
      success: true,
      notifications,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 401));
  }
});

// get signle user
exports.getUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(201).json({ success: true, user });
  } catch (error) {
    return next(new ErrorHandler(error.message, 401));
  }
});

// update user avatar
exports.updateUserAvatar = catchAsyncErrors(async (req, res, next) => {
  try {
    let existsUser = await User.findById(req.user.id);

    if (req.body.avatar !== "") {
      const imageId = existsUser.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageId);

      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
      });

      existsUser.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
    await existsUser.save();

    res.status(200).json({
      success: true,
      user: existsUser,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 401));
  }
});

// update user info
exports.updateUserInfo = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    user.name = req.body.name;
    user.userName = req.body.userName;
    user.bio = req.body.bio;

    await user.save();

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 401));
  }
});


exports.updateUserPassword = catchAsyncErrors(async (req, res, next) => {
  try {
    let { password, email } = req.body;

    const user = await User.findOne({ email });

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    user.password = password;

    await user.save();

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 401));
  }
});
