import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "./authReducer";
import chatReducer from "./chatReducer";
import usersReducer from "./usersReducer";
import extraReducer from "./extraReducer";

const reducers = combineReducers({
  users: usersReducer,
  auth: authReducer,
  chat: chatReducer,
  extra: extraReducer,
});

//Sync state with local storage
const loadState = () => {
  try {
    const localState = localStorage.getItem("state");
    if (!localState) {
      return undefined;
    } else {
      return JSON.parse(localState);
    }
  } catch (err) {
    return undefined;
  }
};

const saveState = state => {
  try {
    const localState = JSON.stringify(state);
    localStorage.setItem("state", localState);
  } catch (err) {
    console.log(err);
  }
};

const rootReducer = (state, action) => {
  if (action.type === "LOG_OUT") {
    state = undefined;
  }
  return reducers(state, action);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, loadState(), composeEnhancers(applyMiddleware(thunk)));

store.subscribe(() => {
  let state = store.getState();
  let stateToSave = { users: state.users, auth: state.auth, extra: state.extra };
  saveState(stateToSave);
});

export default store;
