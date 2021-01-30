import { AppBar, Avatar, Badge, Button, Grid, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { WebSocketContext } from "../../context/socketContext";
import { useStyles } from "./styles";

const Navbar = ({ auth }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const ws = useContext(WebSocketContext);

  const handleLogOut = () => {
    dispatch({ type: "LOG_OUT" });
    ws.closeSocket();
    history.push("/");
  };

  const handleProf = () => {
    history.push("/profile");
  };

  return (
    <AppBar position='static' className={classes.appBar}>
      <Grid item xs={3}>
        <Typography variant='h5' className={classes.title}>
          Chat Box
        </Typography>
      </Grid>
      {auth.user && (
        <Grid item xs={6}>
          <div className={classes.profile} onClick={handleProf}>
            <Badge
              overlap='circle'
              variant='dot'
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}>
              <Avatar src={`${auth.user.img}`}></Avatar>
            </Badge>
            <Typography variant='h6'>{auth.user.name}</Typography>
          </div>
        </Grid>
      )}
      {auth.user && (
        <Grid item xs={3}>
          <Button color='inherit' onClick={handleLogOut}>
            Log out
          </Button>
        </Grid>
      )}
    </AppBar>
  );
};

export default Navbar;
