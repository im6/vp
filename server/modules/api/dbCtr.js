'use strict';
var path = require('path'),
  helper = require('../../misc/helper'),
  globalConfig = require('../../config/env'),
  mysql = require('../../resource/db/mysqlConnection'),
  _ = require('lodash');


module.exports = {
  initColorList: function(req, res, next){
    setTimeout(function(){
      let result = helper.resSuccessObj([
        {  auther: null, username: 'zijian guo', value: '#000,#FCE38A,#EAFFD0,#95E1D3', like: 1},
        {  auther: null, username: 'zijian guo', value: '#a28181,#FCE38A,#EAFFD0,#95E1D3', like: 2},
        {  auther: null, username: 'zijian guo', value: '#838181,#FCE38A,#EAFFD0,#95E1D3', like: 3},
        {  auther: null, username: 'zijian guo', value: '#648181,#FCE38A,#EAFFD0,#95E1D3', like: 4},
        {  auther: null, username: 'zijian guo', value: '#358181,#FCE38A,#EAFFD0,#95E1D3', like: 5},
        {  auther: null, username: 'zijian guo', value: '#000,#FCE38A,#EAFFD0,#95E1D3', like: 6},
        {  auther: null, username: 'zijian guo', value: '#000,#FCE38A,#EAFFD0,#95E1D3', like: 7},
        {  auther: null, username: 'zijian guo', value: '#a28181,#FCE38A,#EAFFD0,#95E1D3', like: 8},
        {  auther: null, username: 'zijian guo', value: '#838181,#FCE38A,#EAFFD0,#95E1D3', like: 9},
        {  auther: null, username: 'zijian guo', value: '#648181,#FCE38A,#EAFFD0,#95E1D3', like: 10},
        {  auther: null, username: 'zijian guo', value: '#358181,#FCE38A,#EAFFD0,#95E1D3', like: 11},
        {  auther: null, username: 'zijian guo', value: '#000,#FCE38A,#EAFFD0,#95E1D3', like: 12},
      ])
      res.json(result);
    }, 1000);

  },
  getColorType: function(req, res, next){
    mysql.getPool().query('select * from colortype', function(err, rows, fields){
      let result = rows.map((v) => {
        return {
          key: v.id,
          value: v.name
        };
      });
      res.json(helper.resSuccessObj(result));
    });
  }
};