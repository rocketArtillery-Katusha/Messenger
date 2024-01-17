const { Router } = require("express");
const userController = require("../controllers/user-controller.js");
const checkAuth = require("../middleware/checkAuth.js");

const router = Router();

router.put("/update-user-info", checkAuth, userController.updateUserInfo);
router.get("/get-users", checkAuth, userController.getUsers);
router.get("/get-user-by-id:id", userController.getUserById);
router.get("/get-friends", checkAuth, userController.getFriends);
router.get("/get-senders-request-friend", checkAuth, userController.getSendersRequestFriend);

router.patch("/toggle-friend", checkAuth, userController.toggleFrined);
router.patch("/toggle-request-friend", checkAuth, userController.toggleRequestFriend);

module.exports = router;
