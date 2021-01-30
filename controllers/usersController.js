import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import socketObject from "../index.js";

export const addUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //Check if user by given email exists
    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(202).json({ message: `User with the email: ${email} already exists` });

    //Encript password
    const hashedPassword = await bcrypt.hash(password, 12);

    //Find all users
    const users = await User.find().select("_id img name email chats isOnline count");

    //Create new user
    const newUser = await User.create({
      img: null,
      name: name,
      email: email,
      password: hashedPassword,
      isOnline: false,
      socketId: "",
      count: 0,
    });

    //Create jwt token
    const token = jwt.sign({ newUser }, "secret", { expiresIn: "1d" });

    //Responce
    res.status(200).json({
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isOnline: newUser.isOnline,
        count: newUser.count,
        token,
      },
      users,
    });

    //Emit new user to all open sockets
    socketObject.sockets.emit("new-user", {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isOnline: newUser.isOnline,
      count: newUser.count,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    //Find user by email
    const existingUser = await User.findOne({ email });

    //Find all users
    const users = await User.find().select("_id img name email chats isOnline count");

    if (!existingUser) return res.status(202).json({ message: `User with the email: ${email} doesn't exist` });
    //Check if password is correct
    const passwordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!passwordCorrect) return res.status(202).json({ message: `Wrong password` });

    //Create token
    const token = jwt.sign({ existingUser }, "secret", { expiresIn: "1d" });

    //Send back existing user info and token
    res.status(200).json({
      user: {
        _id: existingUser._id,
        name: existingUser.name,
        img: existingUser.img,
        email: existingUser.email,
        isOnline: existingUser.isOnline,
        count: existingUser.count,
        token: token,
      },
      users: users,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addProfilePic = async (req, res) => {
  const id = req.body.id;
  const img = req.body.profilePic;

  try {
    const updatedUser = await User.findOneAndUpdate({ _id: id }, { img: img }, { new: true });
    socketObject.sockets.emit("avatar", { id, img });
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
  }
};
