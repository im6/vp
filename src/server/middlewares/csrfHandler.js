import csrf from 'csurf';
import get from 'lodash.get';
import { CSRF_EXCEPTION } from '../constant.server';

const csrfOrigin = csrf();
export default (...args) => {
  // args will be [req, res, next]
  const self = this;
  if (get(args[0], 'body._csrf', null) === CSRF_EXCEPTION) {
    console.log('csrf exception'); // eslint-disable-line no-console
    args[2]();
  } else {
    csrfOrigin.apply(self, args);
  }
};
