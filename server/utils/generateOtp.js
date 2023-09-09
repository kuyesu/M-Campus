const generateOtp = () => {
  try {
    return (otp = Math.floor(1000 + Math.random() * 9000));
  } catch {
    throw new Error("OTP not generated");
  }
};

module.exports = generateOtp;
