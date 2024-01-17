const MessageDto = require("../dtos/message-dto");
const messageService = require("../services/message-service");

class messageController {
    async createMessage(req, res) {
        const { userId } = req;
        const data = { ...req.body };

        const message = await messageService.createMessage({ data, userId });

        const messageDto = new MessageDto(message);

        res.status(200).json({ message: messageDto });
    }
    async getMessages(req, res) {
        const conversationId = req.params.id;

        const messages = await messageService.getMessages({ conversationId });

        const messagesDto = messages.map((message) => new MessageDto(message));

        res.status(200).json({ messages: messagesDto });
    }
}

module.exports = new messageController();
