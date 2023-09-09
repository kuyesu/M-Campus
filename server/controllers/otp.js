const OTP = require("../models/otp");
const generatedOTP = require("../utils/generateOtp");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const bcrypt = require("bcryptjs");
const { hashData, VerifyHashedData } = require("../utils/hashData");
const { AUTH_EMAIL } = process.env;
const sendEmail = require("../utils/sendEmail");

const verifyOTP = async ({ email, otp }) => {
  try {
    if (!(email && otp)) {
      throw new Error("Please provide email and otp");
    }

    const matchedOptRecord = await OTP.findOne({ email });
    
    if (!matchedOptRecord) {
      throw new Error("No otp found");
    }
    // check if otp is expired
    const { expireAt } = matchedOptRecord;
    // console.log("expireAt " + expireAt);
    if (expireAt < new Date()) {
      await OTP.deleteOne({ email });
      throw new Error("OTP expired");
    }

    // verify otp
    const isMatched = await VerifyHashedData(otp, matchedOptRecord.otp);
    return isMatched;
  } catch (error) {
    console.log(error);
    throw new Error("OTP verification failed");
  }
};

const sendOTP = async ({ email, subject, duration = 5, message }) => {
  try {
    if (!(email && message && subject)) {
      throw new Error("Please provide email, subject and message");
    }
    // clear any existing otp
    await OTP.deleteOne({ email });

    // generate new otp
    const generatedOpt = await generatedOTP();
    const expireAt = new Date();
    expireAt.setMinutes(expireAt.getMinutes() + duration);

    // send the otp to email
    const mailOptions = {
      from: AUTH_EMAIL,
      to: email,
      subject,
      html: `<p>${message}<p/><br/><h1 style="color:tomato;letter-spacing:2px;">${generatedOpt}</h1> <br/> <p>OTP expires in ${duration} minutes</p>`,
    };
    await sendEmail(mailOptions);

    // save the hashed   otp in db
    const hashedOTP = await hashData(`${generatedOpt}`);
    const newOTP = await OTP.create({
      email,
      otp: hashedOTP,
      expireAt,
      createdAt: new Date() + 5 * 60 * 1000 * +duration,
    });

    const createdOptRecord = await newOTP.save();
    return createdOptRecord;
  } catch (error) {
    console.log(error);
    throw new Error("OTP not sent");
  }
};

const deleteOTP = async (email) => {
  try {
    await OTP.deleteOne({ email });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete otp");
  }
};

module.exports = {
  sendOTP,
  verifyOTP,
  deleteOTP,
};
