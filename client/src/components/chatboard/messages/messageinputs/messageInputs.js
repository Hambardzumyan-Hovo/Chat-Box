import React, { useContext, useRef } from "react";
import { Button, Icon, TextField } from "@material-ui/core";
import { useStyles } from "./styles";
import { WebSocketContext } from "../../../../context/socketContext";

import { useDispatch, useSelector } from "react-redux";

const MessageInputs = () => {
  const classes = useStyles();
  const msgRef = useRef("");
  const ws = useContext(WebSocketContext);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const extra = useSelector(state => state.extra);
  const users = useSelector(state => state.users);
  const from = auth.user._id;
  const chat_id = extra.chat_id;

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      handleSend();
      e.target.value = "";
    }
  };

  //Get sender and receiver id's from state and sending it via socket
  const handleSend = () => {
    let to;
    let socket_id;
    let value = msgRef.current.value;
    if (from === extra.user_1) {
      to = extra.user_2;
      socket_id = users.filter(u => u._id === to)[0].socketId;
    } else {
      to = extra.user_1;
      socket_id = users.filter(u => u._id === to)[0].socketId;
    }
    let socketMsg = { socket_id, chat_id, from, to, value };
    ws.sendPrivateMessage(socketMsg);
    dispatch({ type: "ADD_MESSAGE", socketMsg });
    msgRef.current.value = "";
  };

  return (
    <div className={classes.sendArea}>
      <TextField
        inputRef={msgRef}
        variant='outlined'
        type='string'
        defaultValue=''
        classes={{ root: classes.input }}
        onKeyPress={handleKeyPress}
      />
      <Button
        className={classes.sendBtn}
        onClick={handleSend}
        color='primary'
        variant='contained'
        endIcon={<Icon>send</Icon>}>
        Send
      </Button>
    </div>
  );
};

export default MessageInputs;
