import { Button, Grid, Paper, TextField } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";
import { useForm } from "react-hook-form";
import AlertDialogSlide from "./dialog";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signUpUser } from "../../redux/authReducer";

const SignupCard = ({ setHasAccount, setBody, setOpen, body, open }) => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = data => {
    dispatch(signUpUser(data, setBody, setOpen));
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
            label='Name'
            name='name'
            type='text'
          />
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
            Sign up
          </Button>
        </Paper>
      </form>
    </Grid>
  );
};

export default SignupCard;
