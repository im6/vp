import path from 'path';
import { STATIC_URL } from '../config';

const scriptUrl = [
  'main.js',
  'main.css',
  'newColor.js',
  'newColor.css',
  'adminPanel.js',
  'adminPanel.css',
];

const { PWD } = process.env;

export default (req, res, next) => {
  const { fileName } = req.params;
  const filePath = path.resolve(PWD, `./${STATIC_URL}/public/${fileName}`);
  if (scriptUrl.includes(fileName)) {
    res.sendFile(filePath);
  } else {
    next(404);
  }
};
