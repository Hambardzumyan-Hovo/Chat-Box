import mongoose from "mongoose";
const Schema = mongoose.Schema;
const chatSchema = Schema({
  chatuser_1: { type: Schema.Types.ObjectId, ref: "User" },
  chatuser_2: { type: Schema.Types.ObjectId, ref: "User" },
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
