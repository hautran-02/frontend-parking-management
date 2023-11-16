import Cookies from 'js-cookie';
import { AccountApi } from '../api';

export const onLogin = async (params) => {
  let isLogin = false;
  let type = 'error';
  let content = '';
  let info = {};
  const { username, password, onComplete } = params;

  try {
    // const rs = await AccountApi.login({ username, password, role: 'admin' });
    if (true) {
      isLogin = true;
      info = {
        username,
        password
      };
      type = 'success';
      content = 'Đăng nhập thành công';
      // Cookies.set("access_token", rs.accessToken);
      localStorage.setItem(
        'auth',
        JSON.stringify({
          isLogin,
          info
        })
      );
    } else {
      content = 'Tên đăng nhập hoặc mật khẩu không đúng';
    }
  } catch (error) {
    type="error";
    content = 'Login Error';
  } finally {
    onComplete(type, content);
  }

  return {
    type: 'auth',
    payload: {
      isLogin,
      info
    }
  };
  // }
};

export const checkAuthenSevice = async ({ onError = null, onFinish = null }) => {
  let result = await AccountApi.checkToken();
  if (result) {
    let account_data = {
      homepage: '/',
      profile: {}
    };
    let data = { ...account_data, isLogin: true };
    onFinish && onFinish();
    return {
      type: 'auth',
      payload: data
    };
  } else {
    // onError && onError({ error: error.data || error });
    onFinish && onFinish();
    return {
      type: 'auth',
      payload: { isLogin: false }
    };
  }
};

export const logout = async () => {
  localStorage.removeItem('isLogin');
  Cookies.remove('access_token');
  localStorage.clear();

  return {
    type: 'auth',
    payload: { isLogin: false }
  };
};

export const onMess = async (payload) => {
  return {
    type: 'mess',
    payload
  };
};
