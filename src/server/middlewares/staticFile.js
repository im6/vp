import path from 'path';
import { SERVER_STATIC_PATH, SERVER_META_FILES } from '../constant.server';

const fileSet = SERVER_META_FILES.reduce((acc, cur) => {
  acc[cur] = true;
  return acc;
}, {});

export default (req, res, next) => {
  const { url } = req;
  if (Object.prototype.hasOwnProperty.call(fileSet, url)) {
    const filePath = path.resolve(process.cwd(), `${SERVER_STATIC_PATH}${url}`);
    res.sendFile(filePath);
  } else {
    next(404);
  }
};
