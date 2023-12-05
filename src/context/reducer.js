const reducer = (state, action) => {
  switch (action.type) {
    case 'auth': {
      return {
        ...state,
        auth: action.payload
      };
    }
    case 'mess': {
      return {
        ...state,
        mess: action.payload
      };
    }
    case 'noti': {
      return {
        ...state,
        noti: action.payload
      };
    }

    case 'onChangePassword': {
      return {
        ...state,
        onChangePassword: action.payload
      };
    }

    default:
      return state;
  }
};

export default reducer;
