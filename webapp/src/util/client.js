import axios from 'axios';
import lsHelpers from 'util/storage-helpers';

// 'Content-Type', 'multipart/form-data'

const BASE_URL = 'http://127.0.0.1:8000';

class TokenManagerClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.endpoint = url => BASE_URL + url;

    this.auth_token = lsHelpers.useAuthToken();
    this.userId = lsHelpers.useUserId();

    this.defaultOptions = () => ({
      headers: {
        Authorization: `Token ${this.auth_token}`,
      },
    });
  }

  get = (url, options = {}) => axios.get(this.endpoint(url), { ...this.defaultOptions(), ...options });
  post = (url, data, options = {}) => axios.post(this.endpoint(url), data, { ...this.defaultOptions(), ...options });
  put = (url, data, options = {}) => axios.put(this.endpoint(url), data, { ...this.defaultOptions(), ...options });
  delete = (url, options = {}) => axios.delete(this.endpoint(url), { ...this.defaultOptions(), ...options });

  login = async (loginForm) => {
    let r = await axios.post(this.endpoint`/auth/token/login`, loginForm);
    const { auth_token } = r.data;
    lsHelpers.setAuthToken(auth_token);
    this.auth_token = auth_token;

    r = await this.get('/auth/me');
    const { id } = r.data;
    lsHelpers.setUserId(id);

    return id || null;
  }

  signup = async (signupForm) => {
    let r = await axios.post(this.endpoint`/signup`, signupForm);
  }
}

export default new TokenManagerClient(BASE_URL);
export {
  BASE_URL,
  TokenManagerClient,
};
