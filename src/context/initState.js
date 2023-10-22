const getIsLogin = () => {
  const isLogin = localStorage.getItem("isLogin") || false;
  return isLogin;
};

const initState = {
  auth: {
    isLogin: getIsLogin(),
  },
  mess: null,
};

export default initState;
