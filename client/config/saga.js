
const context = require.context('../modules/', true, /saga\.js$/);
let keys = context.keys();


export const sagaInitiator = (sagaMiddleware) => {
  keys.forEach(v =>{
    sagaMiddleware.run(context(v).default);
  });
};
