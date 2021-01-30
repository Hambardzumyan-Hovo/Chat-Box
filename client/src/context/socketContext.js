import React, { createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { addMessage } from "../redux/chatReducer";
import { addNewUser, setOnlineUsers, setUserOffline, updateAvatar } from "../redux/usersReducer";

const WebSocketContext = createContext(null);
export { WebSocketContext };

const WebSocketProvider = ({ children }) => {
  let socket;
  let ws;

  const SOCKETENDPOINT = process.env.PORT;

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  if (!socket && auth.user) {
    const { name, _id } = auth.user;
    socket = io.connect(SOCKETENDPOINT, { auth: { name, _id }, transports: ["websocket"] });

    //Set user online when he connects
    socket.on("all", res => {
      dispatch({ type: "SET_ONLINE", res });
    });

    //Receive messages
    socket.on("private-message", socketMsg => {
      dispatch(addMessage(socketMsg));
    });

    //Set online users
    socket.on("online-users", res => {
      dispatch(setOnlineUsers(res));
    });

    // Set user offline
    socket.on("log-out", res => {
      dispatch(setUserOffline(res));
    });

    //Listen for new user
    socket.on("new-user", res => {
      dispatch(addNewUser(res));
    });

    //Listen for avatar change
    socket.on("avatar", res => {
      dispatch(updateAvatar(res));
    });

    //Send message function goes to messageInputs component
    const sendPrivateMessage = socketMsg => {
      socket.emit("private-message", socketMsg);
    };

    //Close socket function goes to navbar component
    const closeSocket = () => {
      socket.emit("log-out");
    };

    ws = {
      socket: socket,
      sendPrivateMessage,
      closeSocket,
    };
  }

  return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>;
};

export default WebSocketProvider;
