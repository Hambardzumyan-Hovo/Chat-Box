import React from "react";
import { Grid } from "@material-ui/core";
import { useStyles } from "./styles";
import User from "./user/user";
import { useSelector } from "react-redux";

const Users = () => {
  const classes = useStyles();
  const users = useSelector(state => state.users);
  const auth = useSelector(state => state.auth);

  return (
    <Grid item xs={3} className={classes.users}>
      {users.map(u => {
        if (u._id !== auth.user._id) {
          return (
            <User
              key={u._id}
              name={u.name}
              img={u.img}
              id={u._id}
              isOnline={u.isOnline}
              socketId={u.socketId}
              authId={auth.user._id}
              count={u.count}
            />
          );
        }
        return null;
      })}
    </Grid>
  );
};

export default Users;
