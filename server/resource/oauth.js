import axios from 'axios';
import {
  fbApi as baseURL,
  redirect_uri_fb,
  fbAppKey,
} from '../config';

export const createFacebookLink = (state) => {
  const url = `https://www.facebook.com/v3.3/dialog/oauth?client_id=${fbAppKey}&response_type=code&state=${state}&redirect_uri=${redirect_uri_fb}`;
  return url;
};

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
