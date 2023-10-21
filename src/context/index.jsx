/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useReducer, createContext } from "react";
import { reducer, initialState } from "./reducer";
import { loginAuthenSevice, logout, checkAuthenSevice } from "./actions";
const AppContext = createContext();

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    logout: async (params) => dispatch(await logout(params)),
    loginAuthenSevice: async (params) =>
      dispatch(await loginAuthenSevice(params)),
    checkAuthenSevice: async (params) =>
      dispatch(await checkAuthenSevice(params)),
  };

  return (
    <AppContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
