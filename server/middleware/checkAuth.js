const tokenService = require("../services/token-service");

module.exports = checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (token) {
            const decoded = tokenService.verifyAccessToken({ token });
            req.userId = decoded.id;

            next();
        } else {
            return res.status(401).json({
                message: "Нет достпуа",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};
