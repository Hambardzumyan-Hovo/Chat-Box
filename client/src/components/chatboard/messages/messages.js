import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setChat } from "../../../redux/chatReducer";
import Loader from "../../loader/loader";
import MessageBoardContainer from "./messageboard/messageBoardContainer";
import MessageInputs from "./messageinputs/messageInputs";
import { useStyles } from "./styles";

const Messages = () => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const authId = auth.user._id;
  const [isLoading, setIsLoading] = useState(false);
  let id = location.search.slice(4);

  useEffect(() => {
    dispatch(setChat(id, authId, setIsLoading));
  }, [id, authId, dispatch]);

  return (
    <Grid item xs={9} className={classes.messages}>
      {!isLoading ? <MessageBoardContainer /> : <Loader />}

      <MessageInputs />
    </Grid>
  );
};

export default Messages;
