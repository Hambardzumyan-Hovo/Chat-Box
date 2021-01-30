import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      data: Buffer,
      type: String,
    },
    isOnline: {
      type: Boolean,
    },
    chats: [{ type: Schema.Types.ObjectId, ref: "Chat" }],
    count: { type: Number },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
