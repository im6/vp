/* eslint no-console: 0, no-unused-vars: 0 */
import path from 'path';

const { PWD } = process.env;

export const onNotFound = (req, res, next) => {
  console.error(`=====  resource(${req.url}) not found  =====`);
  res.status(404).sendFile(path.resolve(PWD, './dist/public/error.html'));
};

export const onError = (err, req, res, next) => {
  console.error('=====  Internal Error  =====');
  console.log(err.toString());
  res.status(err).sendFile(path.resolve(PWD, './dist/public/error.html'));
};
