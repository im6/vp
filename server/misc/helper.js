"use strict";
let privateFn = {

};

module.exports = {
    resSuccessObj: (data)=>{
        return {
            status: 'success',
            result: data
        };
    },
    resFailObj: (err)=>{
        return {
            status: 'error',
            result: err
        };
    }
};