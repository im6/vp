import axios from 'axios';
import { fbApi as baseURL } from '../config';

export const accessToken = (params) => {
  const req = axios({
    baseURL,
    method: 'get',
    url: '/oauth/access_token',
    params
  })
  return req;
}
export const showUser = (params) => {
  const req = axios({
    baseURL,
    method: 'get',
    url: '/me',
    params
  })
  return req;
}
