const express = require("express");
const { sendOTP } = require("../controllers/otp");
const User = require("../models/UserModel");
const sendNewEmail = require("../controllers/verifyNewEmail");

const router = express.Router();

router.post("/send-new-email", async (req, res) => {
  try {
    const { email } = req.body;
    console.log("email" + email);
    if (email === undefined || email === null) {
      throw new Error("Please provide email");
    }

    // check if email already exists
    if (User.findOne({ email })) {
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
