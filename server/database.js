const mongoose = require("mongoose");
const dataEnv = require("./config");

const DbConnect = async () => {
    try {
        const db = await mongoose.connect(`${dataEnv.MONGODB_URL}`);
        db && console.log("Db work");
    } catch (error) {
        console.error(error);
    }
};

module.exports = DbConnect;
