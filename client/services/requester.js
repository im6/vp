/* eslint-disable */
import axios from 'axios';

const tokenElem = document.querySelector('#csrf');
const { token: _csrf } = tokenElem.dataset;
const requester = (url, body) => {
  const options = {
    method: 'post',
    url,
    data: {
      _csrf,
      ...body,
    },
  };
  return axios(options)
    .then(res => res.data)
    .catch(({ response }) => response.data);
};

export default requester;
