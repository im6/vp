import axios from 'axios';
import {
  FB_API_URL as baseURL,
  FB_REDIRECT_URL,
  FB_APP_KEY,
} from '../../constant';

export const createFacebookLink = (state) => {
  const url = `https://www.facebook.com/v3.3/dialog/oauth?client_id=${FB_APP_KEY}&response_type=code&state=${state}&redirect_uri=${FB_REDIRECT_URL}`;
  return url;
};

export const accessToken = (params) => {
  return axios({
    baseURL,
    method: 'get',
    url: '/oauth/access_token',
    params,
  });
};
export const showUser = (params) => {
  return axios({
    baseURL,
    method: 'get',
    url: '/me',
    params,
  });
};
