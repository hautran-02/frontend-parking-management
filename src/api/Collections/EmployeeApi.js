import { DELETE, GET, POST, PUT } from '../axiosMethods';

const DOMAIN = import.meta.env.VITE_DOMAIN;

export default {
  get: (payload) => {
    const url = `${DOMAIN}/user/employee`;
    return GET({
      url,
      payload
    });
  },

  add: (payload) => {
    const url = `${DOMAIN}/user/employee`;
    return POST({
      url,
      payload
    });
  },

};
