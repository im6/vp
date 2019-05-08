import axios from 'axios';

export const accessToken = (params) => {
  const req = axios({
    baseURL: 'https://graph.facebook.com/v3.3',
    method: 'get',
    url: '/oauth/access_token',
    params
  })
  return req;
}
export const showUser = (params) => {
  const req = axios({
    baseURL: 'https://graph.facebook.com/v3.3',
    method: 'get',
    url: '/me',
    params
  })
  return req;
}
