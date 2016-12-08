var globalConfig = require('../../../env/config'),
    _ = require('lodash');
module.exports = {
    createReqJson: function(method, url, obj){
        var reqObj = {};
        for(var onep in obj){
            if(obj.hasOwnProperty(onep)){
                reqObj[onep] = obj[onep];
            }
        }

        // makesure body is stringified json
        if(typeof reqObj["body"] !== "undefined" && typeof reqObj["body"] != "string" ){
            reqObj["body"] = JSON.stringify(reqObj["body"]);
        }

        var result0 = {
            method: method,
            baseUrl: globalConfig.restApi,
            url: url,
            timeout: 20000
        };

        var result = _.assign(result0, reqObj);

        return result;
    }
};