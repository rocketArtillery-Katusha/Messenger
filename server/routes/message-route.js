const { Router } = require("express");
const checkAuth = require("../middleware/checkAuth.js");
const messageController = require("../controllers/message-controller.js");

const router = Router();

router.post("/create-message", checkAuth, messageController.createMessage);
router.get("/get-messages:id", checkAuth, messageController.getMessages);

module.exports = router;
