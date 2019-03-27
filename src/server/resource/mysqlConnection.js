const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit : 8,
  multipleStatements: false,
  host     : process.env['SQL_HOST'],
  port     : process.env['SQL_PORT'],
  user     : process.env['SQL_USERNAME'],
  password : process.env['SQL_PASSWORD'],
  database : process.env['SQL_DATABASE']
});

module.exports = {
  getPool: function(){
    return pool;
  },
  sqlExecOne: function(qr){
    return new Promise(function(resolve, reject){
      pool.query(qr, function(err, rows, fields){
        if(err){
          reject(err);
        }else{
          resolve(rows);
        }
      });
    });
  }
};