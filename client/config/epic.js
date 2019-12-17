import { combineEpics } from 'redux-observable';

const context = require.context('../epics/', true, /\.js$/);
const keys = context.keys();
const epics = keys.reduce((acc, v) => {
  acc = acc.concat(context(v).default);
  return acc;
}, []);

export default combineEpics.apply(null, epics);
