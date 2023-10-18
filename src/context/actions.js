import Cookies from "js-cookie";
import { AccountApi } from "../api";

export const loginAuthenSevice = async ({ acc, onError }) => {
  try {
    let { result } = await AccountApi.login(acc);
    let name = result.name || result.email.split("@")[0];
    let account_data = {
      homepage: "/",
      profile: {
        id: result._id,
        fullName: name,
        email: result.email,
      },
    };
    let data = { ...account_data, isLogin: true };
    Cookies.set("access_token", result.token);
    return {
      type: "auth",
      payload: data,
    };
  } catch (error) {
    onError({ error: error.data || error });
    return {
      type: "auth",
      payload: { isLogin: false },
    };
  }
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
