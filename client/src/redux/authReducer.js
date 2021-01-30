import { addProfilePic, addUser, loginUser } from "../api/api";

const initialState = { user: null };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_USER": {
      return { ...state, user: { ...action.authData } };
    }
    case "UPDATE_IMG": {
      return { ...state, user: { ...state.user, img: action.img } };
    }
    default:
      return state;
  }
};

//thunks
//Is called from components/login/loginCard
export const authUser = (data, setBody, setOpen) => {
  return dispatch => {
    loginUser(data).then(res => {
      if (res.status === 202) {
        setBody(res.data.message);
        setOpen(true);
      } else if (res.status === 200) {
        let authData = res.data.user;
        let users = res.data.users;
        dispatch({ type: "AUTH_USER", authData });
        dispatch({ type: "GET_USERS", users });
      }
    });
  };
};

//Is called from components/login/signupCard
export const signUpUser = (data, setBody, setOpen) => {
  return dispatch => {
    addUser(data).then(res => {
      if (res.status === 202) {
        setBody(res.data.message);
        setOpen(true);
      } else if (res.status === 200) {
        let authData = res.data.user;
        let users = res.data.users;
        dispatch({ type: "AUTH_USER", authData });
        dispatch({ type: "GET_USERS", users });
      }
    });
  };
};

//Is called from components/chatboard/profilePic/profilePic
export const addProfilePicture = (data, setIsLoading) => {
  return dispatch => {
    setIsLoading(true);
    addProfilePic(data).then(res => {
      const img = res.data.img;
      dispatch({ type: "UPDATE_IMG", img });
      setIsLoading(false);
    });
  };
};

export default authReducer;
