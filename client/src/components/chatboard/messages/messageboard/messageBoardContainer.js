import React from "react";
import { useSelector } from "react-redux";
import MessageBoard from "./messageBoard";

const MessageBoardContainer = () => {
  const chat = useSelector(state => state.chat);
  return chat && <MessageBoard chat={chat} />;
};

export default MessageBoardContainer;
