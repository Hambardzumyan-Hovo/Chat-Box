import mongoose from "mongoose";
const Schema = mongoose.Schema;
const messageSchema = Schema(
  {
    chatId: { type: Schema.Types.ObjectId, ref: "Chat" },
    from: { type: String },
    to: { type: String },
    value: { type: String },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
