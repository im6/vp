/* eslint-disable */
require('es6-promise').polyfill();
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

  let rfToken = cookie.get('_csrf');
  if(rfToken){
    if(!body) body = {};
    body['_csrf'] = rfToken;
  }

  var opts = merge.recursive(true, DEFAULTCONFIG, {
    body: JSON.stringify(body)
  });

  return fetch(url, opts)
    .then(jsonParse);
};

export default requester;