import { startChat } from "../api/api";

const initialState = null;

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CHAT": {
      return action.chat;
    }
    case "ADD_MESSAGE": {
      return { ...state, messages: [...state.messages, action.socketMsg] };
    }
    case "EMPTY_CHAT": {
      return initialState;
    }
    default:
      return state;
  }
};

//thunks

//Save chat info and messages
//Is called from components/chatboard/messages/messages
export const setChat = (id, authId, setIsLoading) => {
  return dispatch => {
    let payload = { id, authId };
    setIsLoading(true);
    startChat(payload).then(res => {
      let resChat = res.data;
      let chat = { ...resChat, messages: resChat.messages.reverse() };
      dispatch({ type: "SET_CHAT", chat });
      let chatInfo = { chat_id: chat._id, user_1: chat.chatuser_1, user_2: chat.chatuser_2 };
      dispatch({ type: "SAVE_CHAT_INFO", chatInfo });
      setIsLoading(false);
    });
  };
};

//Add new messages to chat
//Is called from context/socketContext
export const addMessage = socketMsg => {
  return (dispatch, getState) => {
    const state = getState();
    const chat = state.chat;
    const users = state.users;
    if (chat && chat._id === socketMsg.chat_id) {
      dispatch({ type: "ADD_MESSAGE", socketMsg });
    } else if (!chat || chat._id !== socketMsg.chat_id) {
      const updatedCountState = users.map(user => {
        if (user._id === socketMsg.from) {
          return { ...user, count: user.count + 1 };
        } else return { ...user };
      });
      dispatch({ type: "SET_COUNT", updatedCountState });
    }
  };
};

export default chatReducer;
