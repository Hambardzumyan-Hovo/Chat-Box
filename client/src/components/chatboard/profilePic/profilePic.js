import { Avatar, Button, Grid, Paper } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProfilePicture } from "../../../redux/authReducer";
import { useStyles } from "./styles";
import FileBase from "react-file-base64";
import Loader from "../../loader/loader";

const ProfilePic = () => {
  const classes = useStyles();
  const auth = useSelector(state => state.auth);
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleDone = ({ base64 }) => {
    setFile({ id: auth.user._id, profilePic: base64 });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (file) {
      dispatch(addProfilePicture(file, setIsLoading));
    }
  };

  return (
    <Grid item xs={9}>
      <Paper elevation={3} className={classes.profile}>
        <form noValidate className={classes.form}>
          <h3>Profile info</h3>
          <div className={classes.imgContainer}>
            {!isLoading ? <Avatar className={classes.avatar} src={`${auth.user.img}`} /> : <Loader />}
          </div>
          <div className={classes.upload}>
            <FileBase type='file' multiple={false} onDone={handleDone} />
          </div>
          <Button onClick={handleSubmit} color='primary' type='submit' variant='contained'>
            Upload
          </Button>
          <h4>Name: {auth.user.name}</h4>
          <h4>Email: {auth.user.email}</h4>
        </form>
      </Paper>
    </Grid>
  );
};

export default ProfilePic;
