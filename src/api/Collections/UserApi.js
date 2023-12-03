import { DELETE, GET, POST, PUT } from '../axiosMethods';

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

  edit: (_id, payload) => {
    const url = `${DOMAIN}/user?_id=${_id}`;
    return PUT({
      url,
      payload
    });
  },

  delete: (_id) => {
    const url = `${DOMAIN}/user?_id=${_id}`;
    return DELETE({
      url
    });
  }
};
