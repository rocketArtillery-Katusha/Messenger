import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    userInfo: {
        dateOfBirth: {
            day: { type: Number, default: null },
            month: { type: String, default: '' },
            year: { type: Number, default: null },
        },
        gender: { type: String, default: 'Неуказано' },
        hometown: { type: String, default: 'Неуказано' },
        profileStatus: { type: String, default: '' },
        userImg: { type: String, default: 'defaultUserImg.jpg' },
    }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);