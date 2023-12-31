import { Router } from 'express';
import { checkAuth } from '../middleware/checkAuth.js';
import { createPost, getAllPosts, getMyPosts, getPostsById, createComment, getComments, likePost } from '../controllers/post.js';

const router = Router();

router.post('/create-post', checkAuth, createPost);
router.get('/get-all-posts', checkAuth, getAllPosts);
router.get('/get-my-posts', checkAuth, getMyPosts);
router.post('/create-comment', checkAuth, createComment);
router.get('/get-comments:id', checkAuth, getComments);
router.get('/get-posts-by-id:id', getPostsById);
router.patch('/like:id', checkAuth, likePost);

export default router;