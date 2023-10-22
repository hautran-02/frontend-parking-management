/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useReducer, createContext } from "react";
import { loginAuthenSevice, logout, checkAuthenSevice } from "./actions";
import initState from "./initState";
import reducer from "./reducer";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

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
