const Post = require("../models/Post");
const User = require("../models/User");

class postService {
    async createPost({ data, id }) {
        const userId = id;
        const newPost = new Post({
            ...data,
        });

        await User.findByIdAndUpdate(userId, { $push: { posts: newPost._id } });

        await newPost.save();

        return newPost;
    }

    async getPosts() {
        const posts = await Post.find();

        return posts;
    }

    async updatePosts({ posts, dataForUpdateOther }) {
        const updatedPosts = [];

        for (let i = 0; i < posts.length; i++) {
            const postsObjectKeys = Object.keys(posts[i]);
            const dataForUpdateOtherObjectKeys = Object.keys(dataForUpdateOther);

            for (let j = 0; j < dataForUpdateOtherObjectKeys.length; j++) {
                if (dataForUpdateOtherObjectKeys[j] === postsObjectKeys[j]) {
                    posts[i][dataForUpdateOtherObjectKeys[j]] = dataForUpdateOther[dataForUpdateOtherObjectKeys[j]];
                }
            }

            await posts[i].save();
            updatedPosts.push(posts[i]);
        }

        return updatedPosts;
    }

    async findPostById({ postId }) {
        const post = await Post.findById(postId);

        return post;
    }

    async findPostsById({ postsId }) {
        const posts = await Promise.all(postsId.map((postId) => Post.findById(postId)));

        return posts;
    }

    async toggleLikePost({ post, userId }) {
        const checkLike = post.likes.find((id) => id.toString() === userId);

        if (!checkLike) {
            const updatedPost = await Post.findByIdAndUpdate(
                post.id,
                {
                    $push: { likes: userId },
                },
                { new: true }
            );

            return updatedPost;
        } else {
            const updatedPost = await Post.findByIdAndUpdate(
                post.id,
                {
                    $pull: { likes: userId },
                },
                { new: true }
            );

            return updatedPost;
        }
    }

    async addComment({ postId, commentId }) {
        const upadtedPost = await Post.findByIdAndUpdate(postId, { $push: { comments: commentId } });

        return upadtedPost;
    }
}

module.exports = new postService();
