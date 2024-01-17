const User = require("../models/User");

class userService {
    async updateUserInfo({ user, dataForUpdateUser }) {
        const test = await User.findByIdAndUpdate(user._id, { userInfo: dataForUpdateUser.userInfo }, { new: true });
        return test;
    }

    async toggleFrined({ option, senderOrFriendId, userId }) {
        if (option === "delete") {
            const user = await User.findByIdAndUpdate(
                userId,
                {
                    $pull: { friends: senderOrFriendId },
                },
                { new: true }
            );

            const otherUser = await User.findByIdAndUpdate(
                senderOrFriendId,
                {
                    $pull: { friends: userId },
                },
                { new: true }
            );

            return { user, otherUser };
        } else if (option === "accept") {
            const user = await User.findByIdAndUpdate(
                userId,
                {
                    $pull: { friendRequests: senderOrFriendId },
                    $push: { friends: senderOrFriendId },
                },
                { new: true }
            );

            const otherUser = await User.findByIdAndUpdate(
                senderOrFriendId,
                {
                    $push: { friends: userId },
                },
                { new: true }
            );

            return { user, otherUser };
        }
    }

    async toggleRequest({ option, userId, senderId }) {
        if (option === "send") {
            const user = await User.findByIdAndUpdate(
                userId,
                {
                    $push: { friendRequests: senderId },
                },
                { new: true }
            );

            return user;
        } else if (option === "cancel") {
            const user = await User.findByIdAndUpdate(
                userId,
                {
                    $pull: { friendRequests: senderId },
                },
                { new: true }
            );

            return user;
        }
    }

    async getAllUsers({ userId }) {
        const users = await User.find({ _id: { $ne: userId } });

        return users;
    }

    async findUserById({ id }) {
        const user = await User.findById(id);

        return user;
    }

    async findUsersById({ usersId }) {
        const users = await Promise.all(usersId.map((userId) => User.findById(userId)));

        return users;
    }
}

module.exports = new userService();
