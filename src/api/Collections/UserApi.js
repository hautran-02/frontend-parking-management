import { GET, POST, PUT } from '../axiosMethods';

const DOMAIN = import.meta.env.VITE_DOMAIN;

export default {
  getEmployee: (payload) => {
    const url = `${DOMAIN}/user/employee`;
    return GET({
      url,
      payload
    });
  },

  addEmployee: (payload) => {
    const url = `${DOMAIN}/user/employee`;
    return POST({
      url,
      payload
    });
  },

  editEmployee: (_id, payload) => {
    const url = `${DOMAIN}/user/employee?_id=${_id}`;
    return PUT({
      url,
      payload
    });
  }
};
