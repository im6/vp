import mysql from 'mysql';

const {
  SQL_HOST: host,
  SQL_PORT: port,
  SQL_USERNAME: user,
  SQL_PASSWORD: password,
  SQL_DATABASE: database,
} = process.env;

const pool = mysql.createPool({
  connectionLimit: 4,
  multipleStatements: false,
  host,
  port,
  user,
  password,
  database,
});

export default (qr, params = []) =>
  new Promise((resolve, reject) => {
    pool.query(qr, params, (err, rows) => {
      if (err) {
        console.error(err); // eslint-disable-line no-console
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
