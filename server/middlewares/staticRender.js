import path from 'path';
import { isDev } from '../config'
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
]
const appRoot = process.env.PWD;

export const staticFile = (req, res, next) => {
  var subUrl = req.url.split('/');
  const filePath = path.resolve(appRoot,`./dist/public/${subUrl[1]}`);
  if(scriptUrl.includes(subUrl[1])){
    res.sendFile(filePath);
  } else {
    next();
  }
}

export const h5Route = (req, res, next) => {
  var subUrl = req.url.split('/');
  if(FRONTURLs.indexOf(subUrl[1]) > -1){
    if(isDev){
      console.log(`${req.method}: ${req.originalUrl}`);
    } else {
      res.cookie('_csrf',req.csrfToken());
    }
    const indexPath = path.join(appRoot, './dist/public/index.html');
    res.sendFile(indexPath);
  } else {
    next();
  }
}
