import path from 'path';
import {
  isDev,
  staticUrl,
} from '../config'

const FRONTURLs = [
  '',
  'auth',
  'portfolio',
  'popular',
  'latest',
  'like',
  'about',
  'color',
  'new',
  'extract',
  'adminpanel',
];

const scriptUrl = [
  'main.js',
  'newColor.js',
  'adminPanel.js',
];
const { PWD } = process.env;

export const staticFile = (req, res, next) => {
  var subUrl = req.url.split('/');
  const fileName = subUrl[1].replace(/\?.*/, '');
  const filePath = path.resolve(PWD,`./${staticUrl}/public/${fileName}`);
  if(scriptUrl.includes(fileName)){
    res.sendFile(filePath);
  } else {
    next();
  }
}

export const h5Route = (req, res, next) => {
  var subUrl = req.url.split('/');
  if(FRONTURLs.indexOf(subUrl[1]) > -1){
    if(isDev) {
      console.log(`${req.method}: ${req.originalUrl}`);
    } else {
      res.cookie('_csrf',req.csrfToken());
    }
    const indexPath = path.join(PWD, `./${staticUrl}/public/index.html`);
    res.sendFile(indexPath);
  } else {
    next();
  }
}
