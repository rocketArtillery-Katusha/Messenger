class CommentDto {
    id;
    firstName;
    lastName;
    userImg;
    comment;
    authorId;

    constructor(comment) {
        this.id = comment._id;
        this.authorId = comment.authorId;
        this.firstName = comment.firstName;
        this.lastName = comment.lastName;
        this.userImg = comment.userImg;
        this.comment = comment.comment;
    }
}

module.exports = CommentDto;
