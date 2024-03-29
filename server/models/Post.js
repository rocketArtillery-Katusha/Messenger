const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        userImg: { type: String, required: true },
        descPost: { type: String },
        postImg: { type: String, default: "" },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
