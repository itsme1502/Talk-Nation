const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const {encryptString, dcryptString} = require('../utils/encryption');
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");

    messages.forEach((message)=>{
      message.content = dcryptString(message.content);
    })
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  
  try {
  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }
  const encryptedContent = encryptString(content);
  var newMessage = {
    sender: req.user._id,
    content: encryptedContent,
    chat: chatId,
  };

    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
    message.content = dcryptString(message.content);


    res.json(message);
  } catch (error) {-
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allMessages, sendMessage };