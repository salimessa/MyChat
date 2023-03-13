const Message = require("../../models/messageModel");
const Chat = require("../../models/chatModel");

// new message
const createNewMessage = async (req, res) => {
  try {
    // store message
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();

    await Chat.findOneAndUpdate(
      { _id: req.body.chat },
      {
        lastMessage: savedMessage._id,
        $inc: { unreadMessages: 1 },
      }
    );
    res.send({
      success: true,
      message: "Message sent successfully",
      data: savedMessage,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Error sending message",
      data: error.message,
    });
  }
};

// get all mesasges of a chat
const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      chat: req.params.chatId,
    }).sort({ createdAt: 1 });

    res.send({
      success: true,
      message: "Messages fetched successfully",
      data: messages,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Error fetching message",
      data: error.message,
    });
  }
};

module.exports = {
  createNewMessage,
  getAllMessages,
};
