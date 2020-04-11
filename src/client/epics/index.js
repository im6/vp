import { combineEpics } from 'redux-observable';

const context = require.context('./', false, /^.{2}(?!index).*\.js$/);
const keys = context.keys();
const epics = keys.reduce((acc, v) => acc.concat(context(v).default), []);

export default combineEpics(...epics);
