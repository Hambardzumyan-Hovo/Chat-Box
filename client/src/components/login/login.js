import React, { useState } from "react";
import { Button, Grid } from "@material-ui/core";
import { useStyles } from "./styles";
import LoginCard from "./loginCard";
import SignupCard from "./signupCard";
import { useSelector } from "react-redux";

const Login = () => {
  const classes = useStyles();
  const [hasAccount, setHasAccount] = useState(true);
  const auth = useSelector(state => state.auth);
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");

  const switchState = () => setHasAccount(!hasAccount);

  return (
    <Grid container className={classes.container}>
      <Grid item xs={6}>
        <h1>Log in to start chatting</h1>
        <Button onClick={switchState}>{hasAccount ? <h2>Create an account</h2> : <h2>Back to Log in</h2>}</Button>
      </Grid>
      {hasAccount ? (
        <LoginCard
          setHasAccount={setHasAccount}
          auth={auth}
          open={open}
          setOpen={setOpen}
          body={body}
          setBody={setBody}
        />
      ) : (
        <SignupCard
          setHasAccount={setHasAccount}
          auth={auth}
          open={open}
          setOpen={setOpen}
          body={body}
          setBody={setBody}
        />
      )}
    </Grid>
  );
};

export default Login;
