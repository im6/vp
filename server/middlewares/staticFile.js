import path from 'path';
import { STATIC_URL } from '../config';

const scriptSet = [
  'main.js',
  'main.css',
  'newColor.js',
  'newColor.css',
  'adminPanel.js',
  'adminPanel.css',
].reduce((acc, cur) => {
  acc[cur] = true;
  return acc;
}, {});

const { PWD } = process.env;

export default (req, res, next) => {
  const { fileName } = req.params;
  if (fileName in scriptSet) {
    const filePath = path.resolve(PWD, `./${STATIC_URL}/public/${fileName}`);
    res.sendFile(filePath);
  } else {
    next(404);
  }
};
