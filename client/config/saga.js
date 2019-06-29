const context = require.context('../sagas/', true, /\.js$/);
const keys = context.keys();

export default sagaMiddleware => {
  keys.forEach(v => {
    sagaMiddleware.run(context(v).default);
  });
};
