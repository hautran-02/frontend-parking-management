import { POST } from '../axiosMethods';

const DOMAIN = import.meta.env.VITE_DOMAIN;

const AccountApi = {
  login: (payload) => {
    const url = `${DOMAIN}/Auth/Login`;
    return POST({ url, payload });
  }
};
export default AccountApi;
