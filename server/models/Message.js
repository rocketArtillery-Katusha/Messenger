const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
        conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        firstName: { type: String },
        lastName: { type: String },
        userImg: { type: String },
        text: { type: String },
    },

    { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
