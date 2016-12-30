const context = require.context('../reducers/', false, /\.js$/);
const keys = context.keys();

export const moduleReducers = keys.reduce(function(res, v) {
  let str0 = v.replace(/\.js$/,'');
  let str1 = str0.replace(/^.\//,'');
  res[str1] = context(v).default;
  return res;
},{});

