import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import usersRoutes from "./routes/users.js";
import chatsRoutes from "./routes/chats.js";
import http from "http";
import { Server } from "socket.io";
import { saveMessage } from "./controllers/messageController.js";
import dotenv from "dotenv";
import path from "path";

const app = express();
dotenv.config();
const server = http.createServer(app);
const io = new Server(server, { cors: "*", transports: ["websocket"], upgrade: false });

app.use(cors());
app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/users", usersRoutes);
app.use("/chats", chatsRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const __dirname = path.resolve(path.dirname(decodeURI(new URL(import.meta.url).pathname)));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => server.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.log(err));

//Sockets
io.on("connection", socket => {
  //Get all active sockets
  let allSockets = io.of("/").sockets;
  let onlineUsers = [];
  for (let s of allSockets) {
    let sockets = s[1];
    onlineUsers.push({ socketId: sockets.id, ...sockets.handshake.auth });
  }

  //Emit online users
  io.emit("online-users", onlineUsers);

  //Sending private messages
  socket.on("private-message", socketMsg => {
    socket.to(socketMsg.socket_id).emit("private-message", socketMsg, saveMessage(socketMsg));
  });

  socket.on("log-out", () => {
    socket.broadcast.emit("log-out", { ...socket.handshake.auth });
    socket.disconnect();
  });
});

const socketObject = io;

export default socketObject; //Exportig socket.io instance to use in controllers
