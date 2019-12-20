import path from 'path';

const { PWD } = process.env;

const fileSet = ['robots.txt', 'sitemap.xml', 'favicon.ico'].reduce(
  (acc, cur) => {
    acc[cur] = true;
    return acc;
  },
  {}
);

export default (req, res, next) => {
  const { url } = req;
  if (Object.prototype.hasOwnProperty.call(fileSet, url)) {
    const filePath = path.resolve(PWD, `./dist/${url}`);
    res.sendFile(filePath);
  } else {
    next(404);
  }
};
