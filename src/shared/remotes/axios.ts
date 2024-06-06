import axios, { AxiosRequestConfig } from 'axios';
import { SERVER_URL } from './constatns';

const defaultConfig: AxiosRequestConfig = {
    baseURL: SERVER_URL,
}

const client = axios.create(defaultConfig);

client.interceptors.request.use(
  (config) => {
      const token = localStorage.getItem('token'); // 로컬스토리지에서 토큰 가져오기
      if (token) {
          config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

export { client };