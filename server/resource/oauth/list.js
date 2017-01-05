
"use strict";
var util = require("./converter"),
    requester = require("../requester");

module.exports = {
  wb:{
    accessToken: function(obj){
      var obj2 = util.createReqJson('wb', "POST", "/oauth2/access_token", obj);
      return requester.one(obj2);
    },

    getTokenInfo: function(obj){
      var obj2 = util.createReqJson('wb', "POST", "/oauth2/get_token_info", obj);
      return requester.one(obj2);
    },

    revokeOAuth2: function(obj){
      var obj2 = util.createReqJson('wb', "POST", "/oauth2/revokeoauth2", obj);
      return requester.one(obj2);
    },

    showUser: function(obj){
      var obj2 = util.createReqJson('wb', "GET", "/2/users/show.json", obj);
      return requester.one(obj2);
    }

  },
  fb:{
    accessToken: function(obj){
      var obj2 = util.createReqJson('fb', "GET", "/oauth/access_token", obj);
      return requester.one(obj2);
    },


    showUser: function(obj){
      var obj2 = util.createReqJson('fb', "GET", "/me", obj);
      return requester.one(obj2);
    }

  },
  gg:{
    accessToken: function(obj){
      var obj2 = util.createReqJson('gg', "POST", "/oauth2/v4/token", obj);
      return requester.one(obj2);
    },

    showUser: function(obj){
      var obj2 = util.createReqJson('gg', "GET", "/plus/v1/people/me", obj);
      return requester.one(obj2);
    }
  }
};