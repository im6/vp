var request = require("request");

module.exports = {
    one: function(reqObj){
        return new Promise(function (resolve, reject) {
            request(reqObj, function (error, response, body) {
                try {
                    if(!error){
                        var bodyData = JSON.parse(body);
                        resolve(bodyData);
                    }else{
                        reject(new Error(["Request Error"]));
                    }
                } catch (ex) {
                    reject(new Error(["Request Error"]));
                }
            });
        });
    },
    multi: function(iterable){
        return new Promise.all(iterable);
    }
};