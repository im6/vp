/* eslint no-console: 0, no-unused-vars: 0 */
import path from 'path';

const { PWD } = process.env;
export const notFound = (req, res) => {
  console.error('NOT FOUND! url: ', req.url);
  res.status(404).sendFile(path.resolve(PWD, './dist/public/404.html'));
};
export const onError = (err, req, res, next) => {
  if (err === 403) {
    console.error('=====  Deny Admin  =====');
    res.status(403).json(403);
  } else if (err === 404) {
    console.error('=====  Auth Failed  =====');
    res.status(404).json(404);
  } else {
    console.error('=====  Internal Error  =====');
    console.error(err);
    res.status(500).json(500);
  }
};
