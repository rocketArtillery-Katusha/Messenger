const userService = require("../services/user-service");
const authService = require("../services/auth-service");
const postService = require("../services/post-service");
const commentService = require("../services/comment-service");
const fileService = require("../services/file-service");
const UserDto = require("../dtos/user-dto");
const PostDto = require("../dtos/post-dto");
const messageService = require("../services/message-service");

class userController {
    async updateUserInfo(req, res) {
        const id = req.userId;
        const { day, profileStatus, hometown, gender, year, month } = req.body;
        const dataForUpdateUser = {
            userInfo: {
                profileStatus,
                hometown,
                gender,
                dateOfBirth: {
                    day,
                    year,
                    month,
                },
            },
        };

        const user = await userService.findUserById({ id });
        const postsId = user.posts;
        const commentsId = user.comments;
        const messagesId = user.messages;

        if (req.files) {
            let updatedPosts = null;
            const file = req.files.userImg;
            const folderName = "uploadsUser";

            const userImg = fileService.addFile({ file, folderName });

            dataForUpdateUser.userInfo.userImg = userImg;

            const comments = await commentService.findCommentsById({ commentsId });
            const posts = await postService.findPostsById({ postsId });
            const messages = await messageService.findMessagesById({ messagesId });

            const dataForUpdateOther = {
                userImg,
            };

            if (posts) {
                const responsePosts = await postService.updatePosts({
                    posts,
                    dataForUpdateOther,
                });

                updatedPosts = responsePosts;
            }

            if (comments) {
                await commentService.updateComments({
                    comments,
                    dataForUpdateOther,
                });
            }

            if (messages) {
                await messageService.updateMessages({
                    messages,
                    dataForUpdateOther,
                });
            }

            const updatedUser = await userService.updateUserInfo({ user, dataForUpdateUser });
            const userDto = new UserDto(updatedUser);
            const postsDto = updatedPosts.map((post) => new PostDto(post));

            return res.status(200).json({ user: userDto, posts: postsDto });
        }

        const updatedUser = await userService.updateUserInfo({ user, dataForUpdateUser });
        const userDto = new UserDto(updatedUser);

        res.status(200).json({ user: userDto });
    }

    async getSendersRequestFriend(req, res) {
        const { userId } = req;

        const user = await authService.getMyData({ userId });

        const usersId = user.friendRequests;

        const senders = await userService.findUsersById({ usersId });

        const usersDto = senders.map((sender) => new UserDto(sender));

        res.status(200).json({ users: usersDto });
    }

    async toggleFrined(req, res) {
        const senderOrFriendId = req.body.userId;
        const { userId } = req;
        let option;

        const user = await authService.getMyData({ userId });

        const checkFriend = user.friends.find((friendId) => friendId.toString() === senderOrFriendId);

        if (checkFriend) {
            option = "delete";
            const updatedUsers = await userService.toggleFrined({
                option,
                senderOrFriendId,
                userId,
            });

            const userDto = new UserDto(updatedUsers.user);
            const otherUserDto = new UserDto(updatedUsers.otherUser);

            return res.status(200).json({ user: userDto, otherUser: otherUserDto });
        }

        option = "accept";
        const updatedUsers = await userService.toggleFrined({
            option,
            senderOrFriendId,
            userId,
        });

        const userDto = new UserDto(updatedUsers.user);
        const otherUserDto = new UserDto(updatedUsers.otherUser);

        res.status(200).json({ user: userDto, otherUser: otherUserDto });
    }

    async toggleRequestFriend(req, res) {
        const id = req.body.userId;
        const senderId = req.userId;
        let option;

        const user = await userService.findUserById({ id });

        const checkRequest = user.friendRequests.find((requestId) => requestId.toString() === senderId);

        if (!checkRequest) {
            option = "send";
            const userId = id;
            const updatedUser = await userService.toggleRequest({
                option,
                userId,
                senderId,
            });

            const otherUserDto = new UserDto(updatedUser);

            return res.status(200).json({ otherUser: otherUserDto });
        }

        option = "cancel";
        const userId = id;
        const updatedUser = await userService.toggleRequest({
            option,
            userId,
            senderId,
        });

        const otherUserDto = new UserDto(updatedUser);

        res.status(200).json({ otherUser: otherUserDto });
    }

    async getUserById(req, res) {
        const { id } = req.params;

        const user = await userService.findUserById({ id });

        if (!user) {
            return res.status(404).json({ message: "Такого юзера не существует" });
        }

        const otherUserDto = new UserDto(user);

        res.status(200).json({ otherUser: otherUserDto });
    }

    async getUsers(req, res) {
        const { userId } = req;

        const users = await userService.getAllUsers({ userId });

        const usersDto = users.map((user) => new UserDto(user));

        res.status(200).json({ users: usersDto });
    }

    async getFriends(req, res) {
        const { userId } = req;

        const me = await authService.getMyData({ userId });

        const usersId = me.friends;

        const friends = await userService.findUsersById({ usersId });

        const friendsDto = friends.map((friend) => new UserDto(friend));

        res.status(200).json({ friends: friendsDto });
    }
}

module.exports = new userController();
