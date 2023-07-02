import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password1 } = req.body;

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password1, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hash
        });

        const token = jwt.sign({ id: newUser._id, }, process.env.SECRET__KEY, { expiresIn: '1d' });

        await newUser.save();

        res.status(201).json({ newUser, token, });

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        const token = jwt.sign({ id: user._id, }, process.env.SECRET__KEY, { expiresIn: '1d' });

        res.status(200).json({ user, token, });

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }

};

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
}