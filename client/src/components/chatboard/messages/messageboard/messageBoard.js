import { Grid } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import Message from "./message/message";
import { useStyles } from "./styles";

const MessageBoard = ({ chat }) => {
  const classes = useStyles();
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <div className={classes.container}>
      <Grid item xs={12} className={classes.column}>
        {chat.messages.map((m, i) => {
          return <Message key={i} value={m.value} from={m.from} />;
        })}
        <div ref={divRef}></div>
      </Grid>
    </div>
  );
};

export default MessageBoard;
