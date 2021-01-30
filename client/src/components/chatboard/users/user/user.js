import React from "react";
import { Avatar, Badge, Icon } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useStyles } from "./styles";
import { useDispatch, useSelector } from "react-redux";

const User = ({ name, img, id, isOnline, count }) => {
  const classes = useStyles();
  const history = useHistory();
  const extra = useSelector(state => state.extra);
  const dispatch = useDispatch();

  let isActive = false;

  if (history.location.pathname === "/profile/chat")
    if (id === extra.user_1 || id === extra.user_2) {
      isActive = true;
    }

  const handleClick = () => {
    history.push(`/profile/chat?id=${id}`);
    dispatch({ type: "ZERO_COUNT", id });
  };

  return (
    <div className={!isActive ? classes.user : classes.active} onClick={handleClick}>
      <Badge
        classes={!isOnline ? { badge: classes.offline } : { badge: classes.online }}
        overlap='circle'
        variant='dot'
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}>
        <Avatar className={classes.avatar} src={`${img}`}></Avatar>
      </Badge>
      {name}
      <Badge badgeContent={count} classes={{ badge: classes.newMessage }}>
        <Icon color='primary'>mail</Icon>
      </Badge>
    </div>
  );
};

export default User;
