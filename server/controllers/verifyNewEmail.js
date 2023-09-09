const User = require("../models/UserModel");
const sendEmail = require("../utils/sendEmail");
const { sendOTP, verifyOTP, deleteOTP } = require("./otp");

// verify the otp
const verifyOTPNewEmail = async ({ email, otp }) => {
  try {
    const validOtp = await verifyOTP({ email, otp });
    if (!validOtp) {
      throw new Error("Invalid OTP, check your email for the correct code");
    }

    // update the user's email
    await User.updateOne({ email }, { verified: true });

    await deleteOTP(email);
    return true;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to verify OTP");
  }
};

const sendNewEmail = async (email) => {
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new Error("User does not exist");
    }
    const otpOptions = {
      email,
      subject: "Verify your email Larema account",
      message: "Use the following code to verify your email address:",
      duration: 5,
    };
    const createdOTP = await sendOTP(otpOptions);
    return createdOTP;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send otp");
  }
};

module.exports = { sendNewEmail, verifyOTPNewEmail };
