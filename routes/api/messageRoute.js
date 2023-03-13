const {
  createNewMessage,
  getAllMessages,
} = require("../../controllers/api/messageController");
const authMiddleware = require("../../middleware/authMiddleware");

const router = require("express").Router();

router.use(authMiddleware);

router.post("/new-message", createNewMessage);
router.get("/get-all-messages/:chatId", getAllMessages);

module.exports = router;
