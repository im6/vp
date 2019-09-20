/* eslint no-console: 0, no-unused-vars: 0 */
import path from 'path';

const { PWD } = process.env;
const errorPage = path.resolve(PWD, './dist/error.html');

export const onNotFound = (req, res) => {
  console.error(`Error: 404, ${req.url} not found`);
  res.status(400).sendFile(errorPage);
};

export const onError = (err, req, res, next) => {
  console.error(`Error: ${err.toString()}, ${req.url}`);
  if (req.method === 'POST') {
    res.status(400).json({
      errors: true, // consistent with graphql error object
    });
  } else {
    res.status(400).sendFile(errorPage);
  }
};
