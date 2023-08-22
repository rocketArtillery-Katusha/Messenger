import { Router } from 'express';
import { checkAuth } from '../middleware/checkAuth.js';
import { createConversation, createConversationMessage, getConversations, getConversationMessages } from '../controllers/conversation.js';

const router = Router();

router.post('/create-conversation', checkAuth, createConversation);
router.post('/create-message', checkAuth, createConversationMessage);
router.get('/get-conversations', checkAuth, getConversations);
router.get('/get-messages:conversationId', checkAuth, getConversationMessages);


export default router;