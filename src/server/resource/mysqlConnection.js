import mysql from 'mysql';
import config from '../../../dist/config';

const pool = mysql.createPool({
  connectionLimit : 8,
  multipleStatements: false,
  host     : config['SQL_HOST'],
  port     : config['SQL_PORT'],
  user     : config['SQL_USERNAME'],
  password : config['SQL_PASSWORD'],
  database : config['SQL_DATABASE']
});

export const getPool = () => pool;
export const sqlExecOne = qr => {
  return new Promise((resolve, reject) => {
    pool.query(qr, (err, rows, fields) => {
      if(err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}