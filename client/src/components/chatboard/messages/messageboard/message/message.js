import React from "react";
import { useSelector } from "react-redux";
import { useStyles } from "./styles";

const Message = ({ from, to, value }) => {
  const classes = useStyles();
  const auth = useSelector(state => state.auth);
  const auth_id = auth.user._id;

  return (
    <div className={from === auth_id ? classes.msgSentContainer : classes.msgReceivedContainer}>
      <p className={from === auth_id ? classes.msgSent : classes.msgReceived}>{value}</p>
    </div>
  );
};

export default Message;
