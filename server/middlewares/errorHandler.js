/* eslint no-console: 0, no-unused-vars: 0 */
import path from 'path';
import { STATIC_URL } from '../config';

const { PWD } = process.env;

export default (err, req, res, next) => {
  if (err === 404) {
    console.error(`=====  resource(${req.url}) not found  =====`);
    res
      .status(404)
      .sendFile(path.resolve(PWD, `./${STATIC_URL}/public/404.html`));
  } else {
    console.error('=====  Internal Error  =====');
    console.log(err.toString());
    res.status(500).json(500);
  }
};
