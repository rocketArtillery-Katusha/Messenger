class ConversationDto {
    id;
    members;
    createdAt;

    constructor(conversation) {
        this.id = conversation._id;
        this.members = conversation.members;
        this.createdAt = conversation.createdAt;
    }
}

module.exports = ConversationDto;
