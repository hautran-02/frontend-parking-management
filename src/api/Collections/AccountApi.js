import { POST } from '../axiosMethods';

const AccountApi = {
  login: (payload) => {
    const url = 'http://localhost:8010/Auth/Login';
    return POST({ url, payload });
  }
};
export default AccountApi;
