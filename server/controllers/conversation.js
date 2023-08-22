import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";
import User from '../models/User.js';

export const createConversation = async (req, res) => {
    try {
        const newConversation = new Conversation({
            members: [req.userId, req.body.receiverId],
        });

        await newConversation.save();

        res.json(newConversation);

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
}

export const getConversations = async (req, res) => {
    try {
        const foundСonversations = await Conversation.find({
            members: { $in: [req.userId] },
        });

        const сonversations = []

        for (let i = 0; i < foundСonversations.length; i++) {
            const userId = foundСonversations[i].members.find((userId) => userId !== req.userId);
            const user = await User.findById(userId);
            const conversationWithUser = { conversation: foundСonversations[i], user }
            сonversations.push(conversationWithUser);
        }

        res.json(сonversations);

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
}

export const createConversationMessage = async (req, res) => {
    try {
        const newMessage = new Message({
            conversationId: req.body.conversationId,
            senderId: req.body.senderId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userImg: req.body.userImg,
            text: req.body.text
        });

        await newMessage.save();

        res.json(newMessage);

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
}

export const getConversationMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        });

        res.json(messages);

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
}