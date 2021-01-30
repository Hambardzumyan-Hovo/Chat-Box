const initialState = {};

const extraReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_CHAT_INFO": {
      return action.chatInfo;
    }
    default:
      return state;
  }
};

export default extraReducer;
