import { Button, Grid, Paper, TextField } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authUser } from "../../redux/authReducer";
import AlertDialogSlide from "./dialog";
import { useStyles } from "./styles";

const LoginCard = ({ setHasAccount, open, setOpen, body, setBody }) => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = data => {
    dispatch(authUser(data, setBody, setOpen));
    history.push("/profile");
  };

  return (
    <Grid item xs={4}>
      <AlertDialogSlide body={body} open={open} setOpen={setOpen} setHasAccount={setHasAccount} />
      <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <Paper elevation={3} className={classes.paper}>
          <TextField
            required
            inputRef={register}
            className={classes.input}
            variant='outlined'
            label='Email'
            name='email'
            type='email'
          />
          <TextField
            required
            inputRef={register}
            className={classes.input}
            variant='outlined'
            label='Password'
            name='password'
            type='password'
          />
          <Button type='submit' className={classes.input} variant='contained' color='primary'>
            Log in
          </Button>
        </Paper>
      </form>
    </Grid>
  );
};

export default LoginCard;
