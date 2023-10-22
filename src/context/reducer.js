const reducer = (state, action) => {
  switch (action.type) {
    case "auth": {
      return {
        ...state,
        auth: JSON.parse(JSON.stringify(action.payload)),
      };
    }
    default:
      return state;
  }
};

export default reducer;
