const { Router } = require("express");
const checkAuth = require("../middleware/checkAuth.js");
const postController = require("../controllers/post-controller.js");

const router = Router();

router.post("/create-post", checkAuth, postController.createPost);
router.get("/get-posts", checkAuth, postController.getAllPosts);
router.get("/get-my-posts", checkAuth, postController.getMyPosts);
router.get("/get-user-posts:id", postController.getUserPosts);
router.patch("/toggle-like", checkAuth, postController.toggleLikePost);

module.exports = router;
