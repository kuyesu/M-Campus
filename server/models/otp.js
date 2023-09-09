const mongoose = require("mongoose");

const OTP = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    otp: String,
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: 600000 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OTP", OTP);
