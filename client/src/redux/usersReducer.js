const initialState = [];

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERS": {
      return [...action.users];
    }
    case "ADD_USER": {
      return [...action.newState];
    }
    case "SET_ONLINE_USERS": {
      return [...action.newState];
    }
    case "SET_USER_OFFLINE": {
      return [...action.updatedUsers];
    }
    case "SET_COUNT": {
      return [...action.updatedCountState];
    }
    case "ZERO_COUNT": {
      return state.map(user => {
        if (user._id === action.id) return { ...user, count: 0 };
        else return { ...user };
      });
    }
    case "UPDATE_AVATAR": {
      return action.updatedUsersAvatar;
    }
    default:
      return state;
  }
};

//thunks

//Get all online users from socket
//Is called from context/socketContext
export const setOnlineUsers = res => {
  return (dispatch, getState) => {
    const state = getState();
    const users = state.users;
    let newState = [];
    for (let i in users) {
      let shared = false;
      for (let j in res)
        if (res[j]._id === users[i]._id) {
          users[i].socketId = res[j].socketId;
          users[i].isOnline = true;
          newState.push(users[i]);
          shared = true;
          break;
        }
      if (!shared) {
        newState.push(users[i]);
      }
    }
    setTimeout(() => {
      dispatch({ type: "SET_ONLINE_USERS", newState });
    }, 1000);
  };
};

//Set user offline when he logs out
//Is called from context/socketContext
export const setUserOffline = res => {
  return (dispatch, getState) => {
    const state = getState();
    const users = state.users;
    const updatedUsers = users.map(user => {
      if (user._id === res._id) user.isOnline = false;
      return user;
    });
    dispatch({ type: "SET_USER_OFFLINE", updatedUsers });
  };
};

//Add new user when someone registers
//Is called from context/socketContext
export const addNewUser = res => {
  return (dispatch, getState) => {
    const state = getState();
    const users = state.users;
    const userExists = users.some(user => user._id === res._id);
    if (!userExists) {
      const newState = [...users, res];
      dispatch({ type: "ADD_USER", newState });
    }
  };
};

//Update profile pic
//Is called from context/socketContext
export const updateAvatar = res => {
  return (dispatch, getState) => {
    const state = getState();
    const users = state.users;
    const updatedUsersAvatar = users.map(user => {
      if (user._id === res.id) user.img = res.img;
      return user;
    });
    dispatch({ type: "UPDATE_AVATAR", updatedUsersAvatar });
  };
};
export default usersReducer;
