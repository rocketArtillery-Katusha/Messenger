import { Router } from 'express';
import { register, login, getMe, updateUserinfo, deleteFriend, getFriends, getUsersWhoSentFriendRequest, acceptFriend, getUsers, getUserById, sendFriendRequest, cancelFriendRequest } from '../controllers/auth.js';
import { loginValidation, registerValidation } from '../middleware/authValidatuon.js';
import { checkAuth } from '../middleware/checkAuth.js'

const router = Router();

router.put('/update-user-info', checkAuth, updateUserinfo);
router.get('/get-me', checkAuth, getMe);
router.get('/get-users', checkAuth, getUsers);
router.get('/get-user-by-id:id', getUserById);
router.get('/get-friends', checkAuth, getFriends);
router.get('/get-friend-request-users', checkAuth, getUsersWhoSentFriendRequest);

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/friend-request', checkAuth, sendFriendRequest);
router.post('/friend-unsubscribe', checkAuth, cancelFriendRequest);
router.post('/delete-friend', checkAuth, deleteFriend)
router.post('/accept-friend', checkAuth, acceptFriend);

export default router;