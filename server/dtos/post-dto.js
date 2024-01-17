class PostDto {
    id;
    firstName;
    lastName;
    userImg;
    postImg;
    likes;
    authorId;
    comments;
    createdAt;

    constructor(post) {
        this.id = post._id;
        this.firstName = post.firstName;
        this.lastName = post.lastName;
        this.userImg = post.userImg;
        this.postImg = post.postImg;
        this.likes = post.likes;
        this.authorId = post.authorId;
        this.comments = post.comments;
        this.createdAt = post.createdAt;
    }
}

module.exports = PostDto;
