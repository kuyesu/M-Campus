const bcrypt = require("bcryptjs");
const { model } = require("mongoose");

const hashData = async (data, saltRound = 10) => {
    try {
        const hashedData = await bcrypt.hash(data, saltRound);
        return hashedData;
    } catch (error) {
        console.log(error);
        throw new Error("Hashing failed");
    }
}


const VerifyHashedData = async (data, hashedData) => {
    try {
        const isMatched = await bcrypt.compare(data, hashedData);
        return isMatched;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to decrypt data");
    }
}

module.exports = { hashData, VerifyHashedData };