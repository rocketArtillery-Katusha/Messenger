import Post from "../models/Post.js";
import User from '../models/User.js';
import Comment from '../models/Comment.js';
import path, { dirname } from "path";
import { fileURLToPath } from "url";

export const createPost = async (req, res) => {
    try {
        const { descPost } = req.body;
        const user = await User.findById(req.userId);

        if (req.files) {
            let fileName = Date.now().toString() + req.files.imgPost.name;
            const __dirname = dirname(fileURLToPath(import.meta.url));
            req.files.imgPost.mv(path.join(__dirname, '..', 'uploadsPost', fileName));

            const newPostWithImg = new Post({
                firstName: user.firstName,
                lastName: user.lastName,
                userImg: user.userImg,
                descPost,
                imgPost: fileName,
                authorId: req.userId,
            });

            await newPostWithImg.save();
            await User.findByIdAndUpdate(req.userId, {
                $push: { posts: newPostWithImg }
            });

            return res.json(newPostWithImg);
        }

        const newPostWithoutImg = new Post({
            firstName: user.firstName,
            lastName: user.lastName,
            userImg: user.userImg,
            descPost,
            imgPost: '',
            authorId: req.userId,
        });

        await newPostWithoutImg.save();
        await User.findByIdAndUpdate(req.userId, {
            $push: { posts: newPostWithoutImg },
        });

        res.status(201).json(newPostWithoutImg);

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const allPosts = await Post.find().sort({ _id: -1 });

        res.status(200).json(allPosts);

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
};

export const likePost = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await Post.findById(postId);

        const chekLike = post.likes.includes(req.userId);

        if (!chekLike) {
            const updatedPost = await Post.findByIdAndUpdate(postId, {
                $push: { likes: req.userId }
            }, { new: true });

            return res.status(200).json(updatedPost);

        } else {
            const updatedPost = await Post.findByIdAndUpdate(postId, {
                $pull: { likes: req.userId }
            }, { new: true });

            return res.status(200).json(updatedPost);
        }

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
};

export const createComment = async (req, res) => {
    try {
        const { postId, comment } = req.body;
        const user = await User.findById(req.userId);

        if (!comment) {
            return res.json({
                message: 'Комментарий не может быть пустым'
            });
        }

        const newComment = new Comment({
            firstName: user.firstName,
            lastName: user.lastName,
            userImg: user.userImg,
            comment,
            authorId: user._id
        });

        await newComment.save();

        const updatedPost = await Post.findByIdAndUpdate(postId, {
            $push: { comments: newComment._id }
        }, { new: true });

        res.status(201).json({ updatedPost, newComment });

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
};

export const getComments = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        const listComments = await Promise.all(
            post.comments.map((commentId) => Comment.findById(commentId))

        ).then((arr) => {
            return arr.reverse();
        });

        res.status(200).json(listComments);

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
};
