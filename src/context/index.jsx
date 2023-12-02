/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useReducer, createContext } from 'react';
import { logout, checkAuthenSevice, onLogin, onMess, onNoti } from './actions';
import initState from './initState';
import reducer from './reducer';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const actions = {
    logout: async (params) => dispatch(await logout(params)),
    onLogin: async (params) => dispatch(await onLogin(params)),
    checkAuthenSevice: async (params) => dispatch(await checkAuthenSevice(params)),
    onMess: async (params) => dispatch(await onMess(params)),
    onNoti: async (params) => dispatch(await onNoti(params))
  };

  return <AppContext.Provider value={{ state, dispatch, actions }}>{children}</AppContext.Provider>;
};

export default AppContext;
