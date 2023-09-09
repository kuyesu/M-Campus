const express = require("express");
const { sendOTP } = require("../controllers/otp");

const router = express.Router();


router.post('/verify-code', async (req, res) => {
    try {
        const { email, code } = req.body;

    } catch (error) {

    }
});