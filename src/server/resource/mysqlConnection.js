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

pool.query('SELECT 1 + 1 AS solution', (err, res) => {
  if (err || res[0].solution !== 2) {
    console.error(err); // eslint-disable-line no-console
    process.exit(1);
  }
  console.log('MySQL connect successfully.'); // eslint-disable-line no-console
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
