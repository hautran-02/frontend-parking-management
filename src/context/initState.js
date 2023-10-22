import useLocalStorage from "~/shared/useLocalStorage";

const getIsLogin = () => {
  const isLogin = localStorage.getItem("isLogin") || false;
  return isLogin;
};

const initState = {
  auth: {
    isLogin: getIsLogin(),
  },
};

export default initState;
