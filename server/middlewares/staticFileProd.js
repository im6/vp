import path from 'path';

const { PWD } = process.env;
const scriptsList = ['robots.txt', 'sitemap.xml', 'favicon.ico'];

const fileSet = scriptsList.reduce((acc, cur) => {
  acc[cur] = true;
  return acc;
}, {});
console.log('check');
export default (req, res, next) => {
  const fileName = req.url;
  console.log(fileName);
  if (fileName in fileSet) {
    const filePath = path.resolve(PWD, `./dist/${fileName}`);
    console.log(filePath);
    res.sendFile(filePath);
  } else {
    console.log('prod 404');
    next(404);
  }
};
