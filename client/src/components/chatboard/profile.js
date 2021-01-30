import { Grid } from "@material-ui/core";
import React from "react";
import Messages from "./messages/messages";
import Users from "./users/users";
import { useStyles } from "./styles";
import ProfilePic from "./profilePic/profilePic";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const auth = useSelector(state => state.auth);
  const classes = useStyles();
  const location = useLocation();

  let lastPath = location.pathname.split("/").pop();

  const { name, _id } = auth.user;

  return (
    <Grid container className={classes.chat}>
      <Users />
      {lastPath === "chat" ? <Messages name={name} authId={_id} /> : <ProfilePic />}
    </Grid>
  );
};

export default Profile;
