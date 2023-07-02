import { Router } from 'express';
import { register, login, getMe } from '../controllers/auth.js';
import { loginValidation, registerValidation } from '../middleware/authValidatuon.js';
import { checkAuth } from '../middleware/checkAuth.js'

const router = Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/get-me', checkAuth, getMe);

export default router;