import { GET, POST, PUT } from '../axiosMethods';

const DOMAIN = import.meta.env.VITE_DOMAIN;

export default {
  get: (payload) => {
    const url = `${DOMAIN}/user`;
    return GET({
      url,
      payload
    });
  },

  getEmployee: (payload) => {
    const url = `${DOMAIN}/user/employee`;
    return GET({
      url,
      payload
    });
  },

  add: (payload) => {
    const url = `${DOMAIN}/user`;
    return POST({
      url,
      payload
    });
  },

  addMany: (payload) => {
    const url = `${DOMAIN}/user/addMany`;
    return POST({
      url,
      payload
    });
  },

  editEmployee: (_id, payload) => {
    const url = `${DOMAIN}/user/employee?_id=${_id}`;
    return POST({
      url,
      payload
    });
  }
};
