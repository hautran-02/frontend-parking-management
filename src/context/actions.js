import Cookies from "js-cookie";
import { AccountApi } from "../api";

export const onLogin = async (params) => {
  let isLogin = false;
  let type = "error";
  let content = "";
  let info = {};
  const { username, password, onComplete } = params;
  // try {
  //   let { result } = await AccountApi.login(acc);
  //   let name = result.name || result.email.split("@")[0];
  //   let account_data = {
  //     homepage: "/",
  //     profile: {
  //       id: result._id,
  //       fullName: name,
  //       email: result.email,
  //     },
  //   };
  //   let data = { ...account_data, isLogin: true };
  //   Cookies.set("access_token", result.token);
  //   return {
  //     type: "auth",
  //     payload: data,
  //   };
  // } catch (error) {
  //   onError({ error: error.data || error });
  const callApi = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (username === "root" && password == "123") {
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  };

  try {
    const rs = await callApi();
    if (rs) {
      isLogin = true;
      info = {
        username,
        password,
      };
      type = "success";
      content = "Đăng nhập thành công";
    } else {
      content = "Tên đăng nhập hoặc mật khẩu không đúng";
    }
  } catch (error) {
    content = "Login Error";
  } finally {
    onComplete(type, content);
  }

  return {
    type: "auth",
    payload: {
      isLogin,
      info,
    },
  };
  // }
};

export const checkAuthenSevice = async ({
  onError = null,
  onFinish = null,
}) => {
  let result = await AccountApi.checkToken();
  if (result) {
    let account_data = {
      homepage: "/",
      profile: {},
    };
    let data = { ...account_data, isLogin: true };
    onFinish && onFinish();
    return {
      type: "auth",
      payload: data,
    };
  } else {
    // onError && onError({ error: error.data || error });
    onFinish && onFinish();
    return {
      type: "auth",
      payload: { isLogin: false },
    };
  }
};

export const logout = async () => {
  localStorage.removeItem("isLogin");
  Cookies.remove("access_token");

  //backup:
  // pinedEvents
  const pinKey = "pinedEvents";
  const backup = localStorage.getItem(pinKey);
  localStorage.clear();

  if (backup !== null) {
    localStorage.setItem(pinKey, backup);
  }

  return {
    type: "auth",
    payload: { isLogin: false },
  };
};

export const onMess = (payload) => {
  return {
    type: "mess",
    payload,
  };
};
