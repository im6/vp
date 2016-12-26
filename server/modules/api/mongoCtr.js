'use strict';
var path = require('path'),
  helper = require('../../misc/helper'),
  globalConfig = require('../../config/env'),
  _ = require('lodash');


module.exports = {
  initColorList: function(req, res, next){
    setTimeout(function(){
      res.json({
        data: [
          {  auther: null, value: '#000,#FCE38A,#EAFFD0,#95E1D3', like: 1},
          {  auther: null, value: '#a28181,#FCE38A,#EAFFD0,#95E1D3', like: 2},
          {  auther: null, value: '#838181,#FCE38A,#EAFFD0,#95E1D3', like: 3},
          {  auther: null, value: '#648181,#FCE38A,#EAFFD0,#95E1D3', like: 4},
          {  auther: null, value: '#358181,#FCE38A,#EAFFD0,#95E1D3', like: 5},
          {  auther: null, value: '#000,#FCE38A,#EAFFD0,#95E1D3', like: 6},
          {  auther: null, value: '#000,#FCE38A,#EAFFD0,#95E1D3', like: 7},
          {  auther: null, value: '#a28181,#FCE38A,#EAFFD0,#95E1D3', like: 8},
          {  auther: null, value: '#838181,#FCE38A,#EAFFD0,#95E1D3', like: 9},
          {  auther: null, value: '#648181,#FCE38A,#EAFFD0,#95E1D3', like: 10},
          {  auther: null, value: '#358181,#FCE38A,#EAFFD0,#95E1D3', like: 11},
          {  auther: null, value: '#000,#FCE38A,#EAFFD0,#95E1D3', like: 12},
        ],
        error: false
      });
    }, 1000);

  }
};