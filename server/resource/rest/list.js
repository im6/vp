
"use strict";
var util = require("./converter"),
    requester = require("../requester");

module.exports = {
    //===========    token management        ==================
    getUserById: function(obj){
        var obj2 = util.createReqJson("GET", "/user", obj);
        return requester.one(obj2);
    }
};