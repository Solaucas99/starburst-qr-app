import axios from 'axios';
import { refreshToken } from './refreshToken';

const instance = axios.create({
  baseURL: 'https://api.starburst-qr.online',
  timeout: 20000,
  withCredentials: true,
});

instance.interceptors.response.use(
  response => response,
  async err => {
    // If IdToken Expired
    if (err && err.response.data.message === 'jwt expired') {
      const refreshStatus = await refreshToken();
      if (!refreshStatus) {
        return Promise.reject(err);
      }
      return Promise.resolve();
    }
    return Promise.reject(err);
  }
);

export default instance;
