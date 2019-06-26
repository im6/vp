import mysql from 'mysql';
const { env } = process;

const pool = mysql.createPool({
  connectionLimit : 4,
  multipleStatements: false,
  host     : env['SQL_HOST'],
  port     : env['SQL_PORT'],
  user     : env['SQL_USERNAME'],
  password : env['SQL_PASSWORD'],
  database : env['SQL_DATABASE'],
});

export const sqlExecOne = qr => new Promise((resolve, reject) => {
  pool.query(qr, (err, rows) => {
    if (err) {
      console.error(err);
      reject(err);
    } else {
      resolve(rows);
    }
  });
});
