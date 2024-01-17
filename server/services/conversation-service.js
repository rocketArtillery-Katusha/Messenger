const Conversation = require("../models/Conversation");

class conversationService {
    async createConversation({ userId, otherUserId }) {
        const conversation = new Conversation({
            members: [userId, otherUserId],
        });

        await conversation.save();

        return conversation;
    }

    async checkConversation({ userId, otherUserId }) {
        const conversation = await Conversation.find({ members: { $in: [userId, otherUserId] } });

        return conversation;
    }

    async findConversations({ userId }) {
        const conversations = await Conversation.find({ members: { $in: [userId] } });

        return conversations;
    }

    async findConversationById({ conversationId }) {
        const conversation = await Conversation.findById(conversationId);

        return conversation;
    }
}

module.exports = new conversationService();
