import { GET, POST, PUT } from '../axiosMethods';

const DOMAIN = import.meta.env.VITE_DOMAIN;

export default {
  createNew: (payload) => {
    const url = `${DOMAIN}/parking/createParking`;
    return POST({
      url,
      payload
    });
  },

  getStatus: (payload) => {
    const url = `${DOMAIN}/parking/getStatus`;
    return GET({
      url,
      payload
    });
  },
};
