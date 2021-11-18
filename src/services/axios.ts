import axios from 'axios';
import { parseCookies } from 'nookies';
import { refreshToken } from './refreshToken';

const instance = axios.create({
  baseURL: 'https://api.starburst-qr.online',
  timeout: 20000,
  withCredentials: false,
});

instance.interceptors.request.use(
  config => {
    const configAlternate = config;

    const { idToken, accessToken } = parseCookies();

    if (!idToken || !accessToken) return config;

    configAlternate.headers.Authorization = `Bearer ${idToken}, Basic ${accessToken}`;

    return configAlternate;
  },
  async err => Promise.reject(err)
);

instance.interceptors.response.use(
  response => response,
  async err => {
    // If IdToken Expired
    if (
      err.response.status === 401 &&
      err.response.data.message === 'jwt expired'
    ) {
      const refreshStatus = await refreshToken();
      if (!refreshStatus) {
        return Promise.reject(err);
      }
      return instance(err.config);
    }
    return Promise.reject(err);
  }
);

export default instance;
