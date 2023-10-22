const getIsLogin = () => {
  let auth = localStorage.getItem("auth");
  if(auth) {
    auth = JSON.parse(auth);
  } else {
    auth = {
      isLogin: false,
    }
  }
  return auth;
};

const initState = {
  auth: getIsLogin(),
  mess: null,
};

export default initState;
