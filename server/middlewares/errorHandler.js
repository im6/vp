/* eslint no-console: 0, no-unused-vars: 0 */
import path from 'path';

const { PWD } = process.env;
const errorPage = path.resolve(PWD, './dist/error.html');

export const onNotFound = (req, res, next) => {
  console.error(`=====  resource(${req.url}) not found  =====`);
  res.status(404).sendFile(errorPage);
};

export const onError = (err, req, res, next) => {
  console.error('=====  Internal Error  =====');
  console.log(err.toString());
  res.status(err).sendFile(errorPage);
};
