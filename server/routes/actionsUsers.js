import { Router } from 'express';
import { getUsers, getUserById, getPostsById } from '../controllers/actionsUsers.js';
import { checkAuth } from "../middleware/checkAuth.js"

const router = Router();

router.get('/get-users', checkAuth, getUsers);
router.get('/get-user-by-id:id', getUserById);
router.get('/get-posts-by-id:id', getPostsById);

export default router;