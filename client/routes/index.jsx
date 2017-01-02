import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { createAction } from 'redux-actions';

import { Global } from '../config/global';
import { getUserInfo, getInitAuth } from '../services/resource.js';
import App from '../modules/app/index.jsx';
import ErrorPage from '../modules/errorPage';
import Auth from '../modules/auth';
import Color from '../modules/color';
import NewColor from '../modules/newcolor';



const Routes = ({ history, store }) => {

  const initAuth = (nextState, replace, callback) => {
    getInitAuth().then((res) => {
      const ac = createAction('user/initAuth');
      store.dispatch(ac(res));
      if(res.isAuth){
        replace('/');
      }
      callback();
    });
  };
  const checkAuth = (nextState, replace, callback) => {
    if(Global.isDev){
      callback();
    }else{
      getUserInfo().then((res) => {
        const ac1 = createAction('user/initUser');
        store.dispatch(ac1(res));

        const ac2 = createAction('color/initLike');
        store.dispatch(ac2(res));
        callback();
      });
    }
  };

  return <Router history={history} >
    <Route path="/auth"
           component={Auth}
           onEnter={initAuth}
      />
    <Route path="/"
           component={App}
           onEnter={checkAuth}>
      <IndexRoute component={Color}/>
      <Route path="/new" component={NewColor} />
      <Route path="/portfolio" component={Color} />
      <Route path="/like" component={Color} />
      <Route path="*" component={ErrorPage} />
    </Route>
  </Router>;
};


Routes.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export default Routes;
