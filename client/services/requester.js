/* eslint-disable */
import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';

function jsonParse(res) {
  return res.json();
}

const requester = (url, options) => {
  let defaultOptions = {
    "credentials": 'same-origin'
  };

  const opts = { ...defaultOptions,
    ...options
  };

  return fetch(url, opts)
    .then(jsonParse);
};

export default requester;