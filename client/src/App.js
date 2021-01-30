import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Profile from "./components/chatboard/profile";
import Login from "./components/login/login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import decode from "jwt-decode";
import Navbar from "./components/Navbar/navbar";

const App = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  let token;

  if (auth.user) token = auth.user.token;

  //Check if token expired log out
  useEffect(() => {
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch({ type: "LOG_OUT" });
      }
    }
  }, [dispatch, token]);

  return (
    <div className='App'>
      <Router>
        <Navbar auth={auth} />
        <Route path='*'>{!auth.user && <Login />}</Route>
        <Route path='/profile'>{auth.user && <Profile />}</Route>
      </Router>
    </div>
  );
};

export default App;
