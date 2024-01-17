const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        friendRequests: [{ type: mongoose.Schema.Types.ObjectId }],
        friends: [{ type: mongoose.Schema.Types.ObjectId }],
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
        messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
        userInfo: {
            dateOfBirth: {
                day: { type: String, default: "" },
                month: { type: String, default: "" },
                year: { type: String, default: "" },
            },
            gender: { type: String, default: "" },
            hometown: { type: String, default: "" },
            profileStatus: { type: String, default: "" },
            userImg: { type: String, default: "defaultUserImg.jpg" },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
