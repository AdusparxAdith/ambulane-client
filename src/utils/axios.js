/* eslint-disable no-param-reassign */
import axios from 'axios';
import config from '../config';

const instance = axios.create({
  baseURL: config.APP_SERVER_URL,
});

instance.defaults.withCredentials = true;

instance.interceptors.response.use(
  (response) => {
    if (response.status === 200) response.ok = true;
    return response;
  },
  (error) => {
    error.message = error.request.responseText;
    throw new Error(error);
  },
);

export default instance;
