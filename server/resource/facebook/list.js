
"use strict";
var util = require("./converter"),
    requester = require("../requester");

module.exports = {
    //===========    token management        ==================
    accessToken: function(obj){
        var obj2 = util.createReqJson("GET", "/oauth/access_token", obj);
        return requester.one(obj2);
    },


    showUser: function(obj){
        var obj2 = util.createReqJson("GET", "/me", obj);
        return requester.one(obj2);
    }
};