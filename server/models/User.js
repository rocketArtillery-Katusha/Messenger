import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    userImg: { type: String, default: 'https://oir.mobi/uploads/posts/2022-08/1661385261_40-oir-mobi-p-standartnii-fon-vatsap-instagram-56.png' },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
}, { timestamps: true });

export default mongoose.model('User', UserSchema);