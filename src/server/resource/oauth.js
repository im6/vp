/* eslint-disable camelcase  */
import axios from 'axios';
import {
  FB_API_URL,
  FB_APP_KEY,
  FB_APP_SECRET,
  FB_REDIRECT_URL,
  WB_API_URL,
  WB_APP_KEY,
  WB_APP_SECRET,
  WB_REDIRECT_URL,
  GH_API_URL,
  GH_APP_KEY,
  GH_APP_SECRET,
  GH_REDIRECT_URL,
} from '../constant.server';

export const createLoginLink = (type, state) => {
  if (type === 'fb') {
    return `https://www.facebook.com/v3.3/dialog/oauth?client_id=${FB_APP_KEY}&response_type=code&state=${state}&redirect_uri=${FB_REDIRECT_URL}`;
  }
  if (type === 'wb') {
    return `https://api.weibo.com/oauth2/authorize?client_id=${WB_APP_KEY}&scope=follow_app_official_microblog&state=${state}&redirect_uri=${WB_REDIRECT_URL}`;
  }
  if (type === 'gh') {
    return `https://github.com/login/oauth/authorize?client_id=${GH_APP_KEY}&state=${state}&redirect_uri=${GH_REDIRECT_URL}`;
  }
  throw new Error();
};

export const fetchFacebookToken = (code) => {
  const params = {
    client_id: FB_APP_KEY,
    client_secret: FB_APP_SECRET,
    code,
    redirect_uri: FB_REDIRECT_URL,
  };
  return axios({
    baseURL: FB_API_URL,
    method: 'get',
    url: '/oauth/access_token',
    params,
  }).then(({ data }) => {
    const { access_token, expires_in } = data;
    return {
      access_token,
      expires_in,
    };
  });
};

export const fetchWeiboToken = (code) => {
  const params = {
    client_id: WB_APP_KEY,
    client_secret: WB_APP_SECRET,
    code,
    redirect_uri: WB_REDIRECT_URL,
    grant_type: 'authorization_code',
  };
  return axios({
    baseURL: WB_API_URL,
    method: 'post',
    url: '/oauth2/access_token',
    params,
  }).then(({ data }) => {
    const { access_token, expires_in, uid } = data;
    return {
      uid,
      access_token,
      expires_in,
    };
  });
};

export const fetchGithubToken = (code) => {
  const params = {
    client_id: GH_APP_KEY,
    client_secret: GH_APP_SECRET,
    code,
    redirect_uri: GH_REDIRECT_URL,
  };
  return axios({
    method: 'post',
    url: 'https://github.com/login/oauth/access_token',
    headers: {
      Accept: 'application/json',
    },
    params,
  }).then(({ data }) => {
    const { access_token } = data;
    return {
      access_token,
    };
  });
};

export const fetchFacebookProfile = ({ access_token }) =>
  axios({
    baseURL: FB_API_URL,
    method: 'get',
    url: '/me',
    params: {
      access_token,
      fields: 'id,name,picture',
    },
  }).then(({ data }) => ({
    oauthId: data.id,
    name: data.name,
    img: data.picture.data.url,
  }));

export const fetchWeiboProfile = ({ uid, access_token }) =>
  axios({
    baseURL: WB_API_URL,
    method: 'get',
    url: '/2/users/show.json',
    params: {
      uid,
      access_token,
    },
  }).then(({ data }) => ({
    oauthId: data.id,
    name: data.name,
    img: data.profile_image_url,
  }));

export const fetchGithubProfile = ({ access_token }) =>
  axios({
    baseURL: GH_API_URL,
    method: 'get',
    url: '/user',
    headers: {
      Authorization: `token ${access_token}`,
    },
  }).then(({ data }) => ({
    oauthId: data.id,
    name: data.name || data.login,
    img: data.avatar_url,
  }));
