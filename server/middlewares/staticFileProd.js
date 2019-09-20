import path from 'path';

const { PWD } = process.env;
const scriptsList = ['/robots.txt', '/sitemap.xml', '/favicon.ico'];

const fileSet = scriptsList.reduce((acc, cur) => {
  acc[cur] = true;
  return acc;
}, {});

export default (req, res, next) => {
  const { url } = req;
  if (url in fileSet) {
    const filePath = path.resolve(PWD, `./dist${url}`);
    res.sendFile(filePath);
  } else {
    next(404);
  }
};
