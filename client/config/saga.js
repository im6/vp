
const context = require.context('../sagas/', true, /\.js$/);
let keys = context.keys();


export const sagaInitiator = (sagaMiddleware) => {
  keys.forEach(v =>{
    sagaMiddleware.run(context(v).default);
  });
};
