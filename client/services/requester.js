/* eslint-disable */
import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';


function jsonParse(res) {
  //return res.json().then(data => ({ ...res, data }));
  return res.json();
}

const requester = (url, options) => {
  const opts = { ...options };

  let copyHeader = Object.assign({},opts.headers);
  copyHeader = Object.assign(copyHeader, {
    authorization: cookie.get('authorization') || '',
    "Content-Type": 'application/json',
  });
  opts.headers = copyHeader;

  return fetch(url, opts)
    .then(jsonParse);

};

export default requester;