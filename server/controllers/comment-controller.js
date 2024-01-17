const commentService = require("../services/comment-service");
const postService = require("../services/post-service");
const CommentDto = require("../dtos/comment-dto");
const userService = require("../services/user-service");

class commnetController {
    async createComment(req, res) {
        const id = req.userId;
        const clientData = req.body.data;
        const { postId } = req.body;

        const user = await userService.findUserById({ id });

        const data = {
            ...clientData,
            authorId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            userImg: user.userInfo.userImg,
        };

        const comment = await commentService.createComment({ data, id });

        const commentDto = new CommentDto(comment);

        const commentId = commentDto.id;

        await postService.addComment({ postId, commentId });

        res.status(200).json({ comment: commentDto });
    }

    async getComments(req, res) {
        const postId = req.params.id;

        const post = await postService.findPostById({ postId });

        const commentsId = post.comments;

        const comments = await commentService.findCommentsById({ commentsId });

        const commentsDto = comments.map((comment) => new CommentDto(comment));

        commentsDto?.reverse();

        res.status(200).json({ comments: commentsDto });
    }
}

module.exports = new commnetController();
