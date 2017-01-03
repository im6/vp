var globalConfig = require('../../config/env'),
    _ = require('lodash');
module.exports = {
  createReqJson: function(oauthType, method, url, obj){

    var urlBase = null;
    switch(oauthType){
      case 'wb':
        urlBase = globalConfig.weiboApi;
        break;
      case 'fb':
        urlBase = globalConfig.facebookApi;
        break;
      case 'gg':
        urlBase = globalConfig.googleApi;
        break;
      default:
        console.error('error in oauth setup');
        break;
    }

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
        baseUrl: urlBase,
        url: url,
        timeout: 20000
    };

    var result = _.assign(result0, reqObj);

    return result;
  }
};