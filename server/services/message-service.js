const Message = require("../models/Message");
const User = require("../models/User");

class messageService {
    async createMessage({ data, userId }) {
        const message = new Message({
            ...data,
        });

        await User.findByIdAndUpdate(userId, { $push: { messages: message._id } });

        await message.save();

        return message;
    }

    async getMessages({ conversationId }) {
        const messages = await Message.find({ conversationId: conversationId });

        return messages;
    }

    async findMessagesById({ messagesId }) {
        const messages = await Promise.all(messagesId.map((messageId) => Message.findById(messageId)));

        return messages;
    }

    async updateMessages({ messages, dataForUpdateOther }) {
        const updatedMessages = [];

        for (let i = 0; i < messages.length; i++) {
            const messagesObjectKeys = Object.keys(messages[i]);
            const dataForUpdateOtherObjectKeys = Object.keys(dataForUpdateOther);

            for (let j = 0; j < dataForUpdateOtherObjectKeys.length; j++) {
                if (dataForUpdateOtherObjectKeys[j] === messagesObjectKeys[j]) {
                    messages[i][dataForUpdateOtherObjectKeys[j]] = dataForUpdateOther[dataForUpdateOtherObjectKeys[j]];
                }
            }
            await messages[i].save();
            updatedMessages.push(messages[i]);
        }

        console.log(updatedMessages);

        return updatedMessages;
    }
}

module.exports = new messageService();
