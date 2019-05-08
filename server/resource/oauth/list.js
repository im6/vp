const axios = require('axios');

module.exports = {
  fb:{
    accessToken: function(params){
      const req = axios({
        baseURL: 'https://graph.facebook.com/v3.3',
        method: 'get',
        url: '/oauth/access_token',
        params
      })
      return req;
    },
    showUser: function(params){
      const req = axios({
        baseURL: 'https://graph.facebook.com/v3.3',
        method: 'get',
        url: '/me',
        params
      })
      return req;
    }
  },
};