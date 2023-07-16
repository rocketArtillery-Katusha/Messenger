import User from '../models/User.js';
import Post from '../models/Post.js';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        users.filter((el) => el._id !== req.userId);

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
}

export const getPostsById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        const posts = await Promise.all(user.posts.map((postId) => Post.findById(postId))).then((arr) => arr.reverse());

        res.json({ posts });

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
}