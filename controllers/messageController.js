import Chat from "../models/chatModel.js";
import Message from "../models/messageModel.js";

export const saveMessage = async socketMsg => {
  const { chat_id, from, to, value } = socketMsg;
  try {
    //Find chat by id
    const existingChat = await Chat.findById(chat_id).populate("messages");

    //Create message
    const newMessage = await new Message({ chat_id: chat_id, from: from, to: to, value: value });

    //Push new message into existing chat messages array
    await existingChat.messages.push(newMessage);

    //Save existing chat
    await existingChat.save();

    //Save new message
    await newMessage.save();
  } catch (error) {
    console.log(error);
  }
};
