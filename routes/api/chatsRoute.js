const {
  getAllChats,
  clearUnreadMessages,
  createNewChat,
} = require("../../controllers/api/chatsController");
const authMiddleware = require("../../middleware/authMiddleware");

const router = require("express").Router();

router.use(authMiddleware);

router.post("/create-new-chat", createNewChat);
router.get("/get-all-chats", getAllChats);
router.post("/clear-unread-messages", clearUnreadMessages);

module.exports = router;
