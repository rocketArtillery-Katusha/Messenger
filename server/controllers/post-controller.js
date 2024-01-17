const postService = require("../services/post-service");
const userService = require("../services/user-service");
const fileService = require("../services/file-service");
const PostDto = require("../dtos/post-dto");

class postController {
    async createPost(req, res) {
        const id = req.userId;
        const clientData = req.body;

        const user = await userService.findUserById({ id });

        const data = {
            ...clientData,
            authorId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            userImg: user.userInfo.userImg,
        };

        if (req.files) {
            const file = req.files.postImg;

            const folderName = "uploadsPost";

            const postImg = fileService.addFile({ file, folderName });

            data.postImg = postImg;

            const post = await postService.createPost({ data, id });

            const postDto = new PostDto(post);

            return res.status(200).json({ newPost: postDto });
        }

        const post = await postService.createPost({ data, id });

        const postDto = new PostDto(post);

        res.status(200).json({ newPost: postDto });
    }

    async getAllPosts(req, res) {
        const posts = await postService.getPosts();

        const postsDto = posts.map((post) => new PostDto(post));

        postsDto?.reverse();

        res.status(200).json({ posts: postsDto });
    }

    async getMyPosts(req, res) {
        const id = req.userId;

        const user = await userService.findUserById({ id });

        const postsId = user.posts;

        const posts = await postService.findPostsById({ postsId });

        const postsDto = posts.map((post) => new PostDto(post));

        postsDto?.reverse();

        res.status(200).json({ posts: postsDto });
    }

    async getUserPosts(req, res) {
        const { id } = req.params;

        const user = await userService.findUserById({ id });

        const postsId = user.posts;

        const posts = await postService.findPostsById({ postsId });

        const postsDto = posts.map((post) => new PostDto(post));

        postsDto?.reverse();

        res.status(200).json({ posts: postsDto });
    }

    async toggleLikePost(req, res) {
        const { userId } = req;
        const { postId } = req.body;

        const post = await postService.findPostById({ postId });

        const updatedPost = await postService.toggleLikePost({ post, userId });

        const postDto = new PostDto(updatedPost);

        res.status(200).json({ post: postDto });
    }
}

module.exports = new postController();
