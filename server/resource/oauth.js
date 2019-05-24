import axios from 'axios';
import { fbApi as baseURL } from '../config';

export const accessToken = (params) => {
  return axios({
    baseURL,
    method: 'get',
    url: '/oauth/access_token',
    params
  });
}
export const showUser = (params) => {
  return axios({
    baseURL,
    method: 'get',
    url: '/me',
    params
  });
}
