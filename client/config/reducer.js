/* eslint func-names: 0 */
const context = require.context('../reducers/', false, /\.js$/);
const keys = context.keys();

export default keys.reduce(function(res, v) {
  const str0 = v.replace(/\.js$/, '');
  const str1 = str0.replace(/^.\//, '');
  res[str1] = context(v).default;
  return res;
}, {});
