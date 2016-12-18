"use strict";
let privateFn = {

};

module.exports = {
  resSuccessObj: (data)=>{
    return {
        error: false,
        result: data
    };
  },
  resFailObj: (err)=>{
    return {
      error: true,
      result: err
    };
  }
};