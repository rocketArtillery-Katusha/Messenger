import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path, { dirname } from "path";
import { fileURLToPath } from "url";

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password1 } = req.body;

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password1, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hash
        });

        const token = jwt.sign({ id: newUser._id, }, process.env.SECRET__KEY, { expiresIn: '1d' });

        await newUser.save();

        res.status(201).json({ newUser, token, });

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        const token = jwt.sign({ id: user._id, }, process.env.SECRET__KEY, { expiresIn: '1d' });

        res.status(200).json({ user, token, });

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }

};

export const updateUserinfo = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const { day, month, year, gender, profileStatus, hometown } = req.body;

        if (req.files) {
            let fileName = Date.now().toString() + req.files.userImg.name;
            const __dirname = dirname(fileURLToPath(import.meta.url));
            req.files.userImg.mv(path.join(__dirname, '..', 'uploadsUser', fileName));
            user.userInfo.userImg = fileName;

            const comments = await Comment.find({ authorId: req.userId });
            const posts = await Post.find({ authorId: req.userId });

            if (posts) {
                for (let i = 0; i < posts.length; i++) {
                    posts[i].userImg = fileName;
                    await posts[i].save();
                };
            }

            if (comments) {
                for (let i = 0; i < comments.length; i++) {
                    comments[i].userImg = fileName;
                    await comments[i].save();
                };
            }
        }

        user.userInfo.dateOfBirth.day = Number(day) ? Number(day) : user.userInfo.dateOfBirth.day;
        user.userInfo.dateOfBirth.month = month ? month : user.userInfo.dateOfBirth.month;
        user.userInfo.dateOfBirth.year = Number(year) ? Number(year) : user.userInfo.dateOfBirth.year;
        user.userInfo.gender = gender ? gender : user.userInfo.gender;
        user.userInfo.profileStatus = profileStatus ? profileStatus : user.userInfo.profileStatus;
        user.userInfo.hometown = hometown ? hometown : user.userInfo.hometown;


        await user.save();

        res.status(200).json({ user });

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
};

export const getFriends = async (req, res) => {
    try {
        const me = await User.findById(req.userId);

        const friends = await Promise.all(me.friends.map((friendId) => User.findById(friendId)));

        return res.json(friends);

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
}

export const deleteFriend = async (req, res) => {
    try {
        const me = await User.findByIdAndUpdate(req.userId, {
            $pull: { friends: req.body.userId },
        }, { new: true });

        const user = await User.findByIdAndUpdate(req.body.userId, {
            $pull: { friends: req.userId }
        }, { new: true });

        res.json({ me, user });

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
}

export const acceptFriend = async (req, res) => {
    try {
        const me = await User.findByIdAndUpdate(req.userId, {
            $pull: { friendRequests: req.body.userId },
            $push: { friends: req.body.userId }

        }, { new: true });

        const user = await User.findByIdAndUpdate(req.body.userId, {
            $push: { friends: req.userId }
        }, { new: true });

        return res.json({ me, user });

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.userId } });

        res.json(users);

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
};

export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        const posts = await Promise.all(user.posts.map((postId) => Post.findById(postId))).then((arr) => arr.reverse());

        res.json({
            user,
            posts
        });

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
};

export const sendFriendRequest = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.body.userId, {
            $push: { friendRequests: req.userId }

        }, { new: true });

        return res.json(updatedUser);

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
};

export const cancelFriendRequest = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.body.userId, {
            $pull: { friendRequests: req.userId }

        }, { new: true });

        return res.json(updatedUser);

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
};

export const getUsersWhoSentFriendRequest = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        const usersWhoSentFriendRequest = await Promise.all(user.friendRequests.map((userId) => User.findById(userId)));

        res.json(usersWhoSentFriendRequest);

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
};