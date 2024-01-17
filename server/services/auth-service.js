const User = require("../models/User");

class authService {
    async checkEmail({ email }) {
        const user = await User.findOne({ email });

        return user;
    }

    async createUser({ firstName, lastName, email, password }) {
        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
        });

        await newUser.save();

        return newUser;
    }

    async loginUser({ email }) {
        const user = await User.findOne({ email });

        return user;
    }

    async getMyData({ userId }) {
        const user = await User.findById(userId);

        return user;
    }
}

module.exports = new authService();
