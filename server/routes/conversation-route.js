const { Router } = require("express");
const checkAuth = require("../middleware/checkAuth.js");
const conversationController = require("../controllers/conversation-controller.js");

const router = Router();

router.post("/create-conversation", checkAuth, conversationController.createConversation);
router.get("/get-conversations", checkAuth, conversationController.getConversations);
router.get("/get-conversation:id", checkAuth, conversationController.getConversationById);

module.exports = router;
