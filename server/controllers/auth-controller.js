const authService = require("../services/auth-service");
const tokenService = require("../services/token-service");
const hashPasswordService = require("../services/hash-password-service");
const UserDto = require("../dtos/user-dto");

class authController {
    async registerUser(req, res) {
        const { firstName, lastName, email, password1 } = req.body;

        const password = hashPasswordService.hashPassword(password1);

        const user = await authService.createUser({
            firstName,
            lastName,
            email,
            password,
        });

        const userDto = new UserDto(user);

        const token = tokenService.generateToken(userDto.id);

        return res.status(200).json({ user: userDto, token });
    }

    async loginUser(req, res) {
        const { email } = req.body;

        const user = await authService.loginUser({ email });

        const userDto = new UserDto(user);

        const token = tokenService.generateToken(userDto.id);

        res.status(200).json({ user: userDto, token });
    }

    async getMe(req, res) {
        const { userId } = req;

        const user = await authService.getMyData({ userId });

        const userDto = new UserDto(user);

        const token = tokenService.generateToken(userDto.id);

        res.status(200).json({ user: userDto, token });
    }
}

module.exports = new authController();
