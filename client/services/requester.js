/* eslint-disable */
import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import merge from 'merge';

const DEFAULTCONFIG = {
  method: 'POST',
  headers: {
    "Content-Type": 'application/json',
  },
  credentials: 'same-origin'
};

function jsonParse(res) {
  return res.json();
}

const requester = (url, body) => {

  if(!body) body = {};
  body['_csrf'] = cookie.get('_csrf');

  var opts = merge.recursive(true, DEFAULTCONFIG, {
    body: JSON.stringify(body)
  });

  return fetch(url, opts)
    .then(jsonParse);
};

export default requester;