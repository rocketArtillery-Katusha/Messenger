import { body, validationResult } from 'express-validator';
import User from '../models/User.js'
import bcrypt from 'bcrypt';

export const registerValidation = [

    body('firstName')
        .custom((firstName) => !/\s/.test(firstName)).withMessage('В вашем имени есть пробелы')
        .isLength({ min: 2, max: 25 }).withMessage('Длина имени от 2 до 25 символов'),

    function (req, res, next) {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json({
                message: error.errors[0].msg
            });
        }

        next();
    },

    body('lastName')
        .custom((lastName) => !/\s/.test(lastName)).withMessage('В вашей фамили есть пробелы')
        .isLength({ min: 3, max: 25 }).withMessage('Длина фамилии от 3 до 25 символов'),

    function (req, res, next) {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json({
                message: error.errors[0].msg
            });
        }

        next();
    },

    body('email')
        .custom((email) => !/\s/.test(email)).withMessage('Почта введина некорректно')
        .isLength({ min: 8, max: 64 }).withMessage('Длина почты от 8 до 64 символов')
        .isEmail().withMessage('Почта введина некорректно'),

    async function (req, res, next) {
        const error = validationResult(req);
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!error.isEmpty()) {
            return res.status(400).json({
                message: error.errors[0].msg
            });

        } else if (user) {
            return res.status(401).json({
                message: 'Такой пользователь уже существует'
            });
        }

        next();
    },

    body('password1')
        .custom((password1, { req }) => password1 === String(req.body.password2)).withMessage('Пароли должны совпадать')
        .custom((password) => !/\s/.test(password)).withMessage('Пароль должен быть без пробелов')
        .isLength({ min: 6, max: 16 }).withMessage('Длина пороля от 6 до 16 символов'),

    function (req, res, next) {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json({
                message: error.errors[0].msg
            });
        }

        next();
    }
];

export const loginValidation = [
    body('email')
        .custom((email) => !/\s/.test(email)).withMessage('Неверный логин или пароль')
        .isLength({ min: 8, max: 64 }).withMessage('Неверный логин или пароль')
        .isEmail().withMessage('Неверный логин или пароль'),

    async function (req, res, next) {
        const error = validationResult(req);
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!error.isEmpty()) {
            return res.status(400).json({
                message: error.errors[0].msg
            });

        } else if (!user) {
            return res.status(401).json({
                message: 'Такого пользователя не существует'
            });
        }

        next();
    },

    body('password')
        .custom((password) => !/\s/.test(password)).withMessage('Неверный логин или пароль')
        .isLength({ min: 6, max: 16 }).withMessage('Неверный логин или пароль'),

    async function (req, res, next) {
        const error = validationResult(req);
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!error.isEmpty()) {
            return res.status(400).json({
                message: error.errors[0].msg
            });

        } else if (!isPasswordCorrect) {
            return res.status(400).json({
                message: 'Неверный пароль'
            });
        }

        next();
    }
];