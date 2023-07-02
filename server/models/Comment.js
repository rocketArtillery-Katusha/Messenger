import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userImg: { type: String, required: true },
    comment: { type: String, required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Comment', CommentSchema);