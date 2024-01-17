const jwt = require("jsonwebtoken");
const dataEnv = require("../config");

class tokenService {
    generateToken(id) {
        const token = jwt.sign({ id }, dataEnv.SECRET_KEY, {
            expiresIn: dataEnv.EXPIRES_IN,
        });

        return token;
    }

    verifyAccessToken({ token }) {
        return jwt.verify(token, dataEnv.SECRET_KEY);
    }
}

module.exports = new tokenService();
