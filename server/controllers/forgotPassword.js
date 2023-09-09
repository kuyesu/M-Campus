const User = require("../models/UserModel");
const { sendOTP, verifyOTP, deleteOTP } = require("./otp");
const { hashData, VerifyHashedData } = require("../utils/hashData");

const sendPasswordResetOTPEmail = async (email) => {
    try {
        //   cehck if account exists
        const { email } = req.body;
        const userEXits = await User.findOne({ email });
        if (!userEXits) {
            throw new Error("Account does not exist");
        }
        // send otp to email
        const otpOptions = {
            email,
            subject: "Password reset OTP",
            message: "Use the following code to reset your password:",
            duration: 5,
        };
        const createdOTP = await sendOTP(otpOptions);
        return createdOTP;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to send otp");
  }
};

const verifyPasswordResetOTP = async ({email, otp, newPassword}) => {
    try {
        const validOTP = await verifyOTP({ email, otp });
        if (!validOTP) {
            throw new Error("Invalid OTP, check your email for the correct code");
        }
        // update the user's password
        if (newPassword.length < 8) {
            throw new Error("Please provide new password");
        }
        const hashedPassword = await hashData(newPassword);
        await User.updateOne({ email }, { password: hashedPassword })
        await deleteOTP(email);
        return true;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to verify OTP");
    }
}

module.exports = { sendPasswordResetOTPEmail, verifyPasswordResetOTP };