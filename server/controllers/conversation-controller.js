const conversationService = require("../services/conversation-service");
const ConversationDto = require("../dtos/conversation-dto");

class conversationController {
    async createConversation(req, res) {
        const otherUserId = req.body.userId;
        const { userId } = req;

        const checkConversation = await conversationService.checkConversation({ userId, otherUserId });

        if (checkConversation.length) {
            return res.status(200).json({ conversationId: checkConversation._id });
        }

        const conversation = await conversationService.createConversation({ userId, otherUserId });

        res.status(200).json({ conversationId: conversation.id });
    }

    async getConversations(req, res) {
        const { userId } = req;

        const conversations = await conversationService.findConversations({ userId });

        const conversationsDto = conversations?.map((conversation) => new ConversationDto(conversation));

        res.status(200).json({ conversations: conversationsDto });
    }

    async getConversationById(req, res) {
        const conversationId = req.params.id;

        const conversation = await conversationService.findConversationById({ conversationId });

        if (!conversation) {
            return res.status(404).json({ message: "Такой беседы не существует" });
        }

        const conversationDto = new ConversationDto(conversation);

        res.status(200).json({ conversation: conversationDto });
    }
}

module.exports = new conversationController();
