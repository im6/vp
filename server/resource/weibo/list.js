
"use strict";
var util = require("./converter"),
    requester = require("../requester");

module.exports = {
    //===========    token management        ==================
    accessToken: function(obj){
        var obj2 = util.createReqJson("POST", "/oauth2/access_token", obj);
        return requester.one(obj2);
    },

    getTokenInfo: function(obj){
        var obj2 = util.createReqJson("POST", "/oauth2/get_token_info", obj);
        return requester.one(obj2);
    },

    revokeOAuth2: function(obj){
        var obj2 = util.createReqJson("POST", "/oauth2/revokeoauth2", obj);
        return requester.one(obj2);
    },

    //===========    user info        ==================

    showUser: function(obj){
        var obj2 = util.createReqJson("GET", "/2/users/show.json", obj);
        return requester.one(obj2);
    }
};