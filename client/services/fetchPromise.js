import fetch from 'isomorphic-fetch';

const fetchPromise = function (url, options) {
  return fetch(url, options);
};
export default fetchPromise;