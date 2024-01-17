const { Router } = require("express");
const checkAuth = require("../middleware/checkAuth.js");
const commentController = require("../controllers/comment-controller.js");

const router = Router();

router.post("/create-comment", checkAuth, commentController.createComment);
router.get("/get-comments:id", checkAuth, commentController.getComments);

module.exports = router;
