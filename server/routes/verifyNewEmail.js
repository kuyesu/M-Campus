const express = require("express");
const User = require("../models/UserModel");
const {
  sendNewEmail,
  verifyOTPNewEmail,
} = require("../controllers/verifyNewEmail");

const router = express.Router();

router.post("/verify-new-email", async (req, res) => {
  try {
    let { email, otp } = req.body;
    // if (!(email && otp)) {
    //   throw new Error("Please provide email");
    // }
    console.log("email " + email + " otp " + otp);
    await verifyOTPNewEmail({ email, otp });
    res.status(200).json({
      email,
      success: true,
      verified: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/send-new-email", async (req, res) => {
  try {
    const { email } = req.body;
    console.log("email " + email);

    if (email === undefined || email === null) {
      throw new Error("Please provide email");
    }

    // check if email already exists
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("Email already exists");
    }
    // send otp to email
    const createdOTP = await sendNewEmail(email);
    res.status(200).json(createdOTP);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
