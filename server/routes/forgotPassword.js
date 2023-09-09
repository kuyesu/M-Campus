const express = require("express");
const User = require("../models/UserModel");
const {
  sendNewEmail,
  verifyOTPNewEmail,
} = require("../controllers/verifyNewEmail");
const {
  sendPasswordResetOTPEmail,
  verifyPasswordResetOTP,
} = require("../controllers/forgotPassword");

const router = express.Router();

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (email === undefined || email === null) {
      throw new Error("Please provide email");
    }
    const createdOTP = await sendPasswordResetOTPEmail(email);
    res.status(200).json(createdOTP);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (email === undefined || email === null) {
      throw new Error("Please provide email");
    }

    await verifyPasswordResetOTP({ email, otp, newPassword });
    res.status(200).json({
      email,
      success: true,
      reset: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});


module.exports = router;