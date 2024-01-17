class MessageDto {
    id;
    conversationId;
    senderId;
    firstName;
    lastName;
    userImg;
    text;

    constructor(message) {
        this.id = message._id;
        this.conversationId = message.conversationId;
        this.senderId = message.senderId;
        this.firstName = message.firstName;
        this.lastName = message.lastName;
        this.userImg = message.userImg;
        this.text = message.text;
    }
}

module.exports = MessageDto;
