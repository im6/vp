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
import About from '../modules/about';
import ResourceApi from '../modules/resourceApi';
import AdminPanel from '../modules/adminPanel';


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
    getUserInfo().then((res) => {
      const ac1 = createAction('user/initUser');
      store.dispatch(ac1(res));

      const ac2 = createAction('color/initLike');
      store.dispatch(ac2(res));
      callback();
    });
  };

  const initAdmin = (nextState, replace, callback) => {
    getUserInfo().then((res) => {
      if(res.profile && res.profile.isAdmin){
        const ac0 = createAction('admin/getList');
        store.dispatch(ac0());
      }else{
        replace('/');
      }

      callback();
    });
  };

  const initColor = (nextState, replace, callback) => {
    let nextUrl = nextState.location.pathname,
      actName = null;

    switch (nextUrl){
      case '/':
        actName = 'color/get';
        break;
      case '/latest':
        actName = 'color/getLatest';
        break;
      case '/portfolio':
        actName = 'color/getPortfolio';
        break;
      case '/like':
        actName = 'color/getLike';
        break;
      default:
        break;
    }

    if(actName){
      const ac = createAction(actName);
      store.dispatch(ac());
    }

    callback();

  };

  return <Router history={history} >
    <Route path="/auth"
           component={Auth}
           onEnter={initAuth}
      />
    <Route path="/"
           component={App}
           onEnter={checkAuth}>
      <IndexRoute component={Color} onEnter={initColor}/>
      <Route path="/latest" component={Color} onEnter={initColor} />
      <Route path="/portfolio" component={Color} onEnter={initColor} />
      <Route path="/like" component={Color} onEnter={initColor} />

      <Route path="/new" component={NewColor} />
      <Route path="/extract" component={NewColor} />
      <Route path="/resourceapi" component={ResourceApi} />
      <Route path="/about" component={About} />
      <Route path="/adminpanel" component={AdminPanel} onEnter={initAdmin} />
      <Route path="*" component={ErrorPage} />

    </Route>
  </Router>;
};


Routes.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export default Routes;
