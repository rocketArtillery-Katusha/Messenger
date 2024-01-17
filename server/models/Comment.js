const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        userImg: { type: String, required: true },
        comment: { type: String, required: true },
        authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
