require("dotenv").config();

const dataEnv = {
    MONGODB_URL: process.env.MONGODB_URL,
    PORT: process.env.PORT || 4000,
    SECRET_KEY: process.env.SECRET_KEY || "secret123",
    EXPIRES_IN: process.env.EXPIRES_IN || "1d",
};

module.exports = dataEnv;
