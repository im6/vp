import {
  redirect_uri_fb,
  fbAppKey,
} from '../../config/index';

export const createFacebookLink = (state) => {
  const url = `https://www.facebook.com/v3.3/dialog/oauth?client_id=${fbAppKey}&response_type=code&state=${state}&redirect_uri=${redirect_uri_fb}`;
  return url;
};
