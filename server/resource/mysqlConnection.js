import mysql from 'mysql';
const { env } = process;

const pool = mysql.createPool({
  connectionLimit : 8,
  multipleStatements: false,
  host     : env['SQL_HOST'],
  port     : env['SQL_PORT'],
  user     : env['SQL_USERNAME'],
  password : env['SQL_PASSWORD'],
  database : env['SQL_DATABASE']
});

export const getPool = () => pool;
export const sqlExecOne = qr => {
  return new Promise((resolve, reject) => {
    pool.query(qr, (err, rows, fields) => {
      if(err) {
        console.error(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};
