import path from 'path';

const { PWD } = process.env;
const scriptsList = ['robots.txt', 'sitemap.xml', 'favicon.ico'];

const fileSet = scriptsList.reduce((acc, cur) => {
  acc[cur] = true;
  return acc;
}, {});

export default (req, res, next) => {
  const fileName = req.url;
  if (fileName in fileSet) {
    const filePath = path.resolve(PWD, `./dist/${fileName}`);
    res.sendFile(filePath);
  } else {
    next(404);
  }
};
