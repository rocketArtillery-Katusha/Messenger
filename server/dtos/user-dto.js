class UserDto {
    id;
    firstName;
    lastName;
    email;
    friendRequests;
    friends;
    posts;
    comments;
    messages;
    userInfo;
    createdAt;

    constructor(user) {
        this.id = user._id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.friendRequests = user.friendRequests;
        this.friends = user.friends;
        this.posts = user.posts;
        this.comments = user.comments;
        this.messages = user.messages;
        this.userInfo = user.userInfo;
        this.createdAt = user.createdAt;
    }
}

module.exports = UserDto;
