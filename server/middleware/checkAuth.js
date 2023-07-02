import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (token) {
            const decoded = jwt.verify(token, process.env.SECRET__KEY);
            req.userId = decoded.id;

            next();

        } else {
            return res.status(401).json({
                message: 'Нет достпуа'
            });
        }

    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};