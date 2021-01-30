import Chat from "../models/chatModel.js";
import User from "../models/userModel.js";

export const startChat = async (req, res) => {
  const { id, authId } = req.body;

  try {
    //Check if chat exists in both users
    const existingChat_1 = await Chat.find()
      .and([{ chatuser_1: authId }, { chatuser_2: id }])
      .populate({ path: "messages", options: { limit: 100, sort: { createdAt: -1 } } });
    const existingChat_2 = await Chat.find()
      .and([{ chatuser_1: id }, { chatuser_2: authId }])
      .populate({ path: "messages", options: { limit: 100, sort: { createdAt: -1 } } });

    if (existingChat_1.length === 0 && existingChat_2.length === 0) {
      //Create new chat
      const newChat = await new Chat({ chatuser_1: authId, chatuser_2: id });

      //Find chat users
      const chatuser_1 = await User.findById(authId);
      const chatuser_2 = await User.findById(id);

      //Add new chat into users
      await chatuser_1.chats.push(newChat);
      await chatuser_2.chats.push(newChat);

      //Save new chat
      await newChat.save();

      //Save users
      await chatuser_1.save();
      await chatuser_2.save();

      //Res back new chat
      res.status(201).json(newChat);

      //Res back existing chats
    } else if (existingChat_1.length > 0) {
      res.status(200).json(existingChat_1[0]);
    } else if (existingChat_2.length > 0) {
      res.status(200).json(existingChat_2[0]);
    } else {
      res.status(404).send("something wrong happened");
    }
  } catch (error) {
    console.log(error);
  }
};
