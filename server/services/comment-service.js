const Comment = require("../models/Comment");
const User = require("../models/User");

class commentService {
    async createComment({ data, id }) {
        const userId = id;
        const newComment = new Comment({
            ...data,
        });

        await User.findByIdAndUpdate(userId, { $push: { comments: newComment._id } });

        await newComment.save();

        return newComment;
    }

    async updateComments({ comments, dataForUpdateOther }) {
        const updatedComments = [];

        for (let i = 0; i < comments.length; i++) {
            const commentsObjectKeys = Object.keys(comments[i]);
            const dataForUpdateOtherObjectKeys = Object.keys(dataForUpdateOther);
            for (let j = 0; j < dataForUpdateOtherObjectKeys.length; j++) {
                if (dataForUpdateOtherObjectKeys[j] === commentsObjectKeys[j]) {
                    comments[i][dataForUpdateOtherObjectKeys[j]] = dataForUpdateOther[dataForUpdateOtherObjectKeys[j]];
                }
            }
            await comments[i].save();
            updatedComments.push(comments[i]);
        }

        return updatedComments;
    }

    async findCommentsById({ commentsId }) {
        const comments = await Promise.all(commentsId.map((commentId) => Comment.findById(commentId)));

        return comments;
    }
}

module.exports = new commentService();
