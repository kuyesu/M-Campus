const express = require("express");
const { sendOTP, verifyOTP, deleteOTP } = require("../controllers/otp");

const router = express.Router();

router.post("/verify-code", async (req, res) => {
  try {
      const { email, otp } = req.body;

    const validOtp = await verifyOTP({ email, otp });
    res.status(200).json({
      success: true,
      valid: validOtp,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/send-code", async (req, res) => {
    try {

    const { email, subject, message, duration } = req.body;

    const createdOpt = await sendOTP({ email, duration, message, subject });
    res.status(200).json(createdOpt);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
