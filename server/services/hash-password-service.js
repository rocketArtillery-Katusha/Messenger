const bcrypt = require("bcrypt");

class hashPasswordService {
    hashPassword(password) {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        return hashPassword;
    }

    checkPassword(password, hashedPassword) {
        const unhashedPassword = bcrypt.compare(password, hashedPassword);

        return unhashedPassword;
    }
}

module.exports = new hashPasswordService();
