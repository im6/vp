import React from 'react';
import PropTypes from 'prop-types';
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
  const fillColors = () => {
    if(store. getState().color.get('list').size < 1){
      const ac = createAction('color/get');
      store.dispatch(ac());
    }
  };

  const setView = (viewName) => {
    const ac = createAction('color/setView');
    store.dispatch(ac(viewName));
  };

  const scrollTop = () => {
    if(window.scrollY > 220){
      window.scrollTo(0, 0);
    }
  };

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
    let user = store.getState().user;
    setView('adminpanel');
    if(user.getIn(['detail', 'isAdmin'])){
      const ac0 = createAction('admin/getList');
      store.dispatch(ac0());
    }else{
      replace('/');
    }

    callback();
  };

  const initBoxes = (nextState, replace, callback) => {
    fillColors();
    let nextUrl = nextState.location.pathname,
      actName = null,
      param = null;

    if(nextUrl.substring(0,7) === "/color/"){
      nextUrl = '/color';
    }

    switch (nextUrl){
      case '/':
        actName = 'color/setView';
        param = 'popular';
        break;
      case '/latest':
        actName = 'color/setView';
        param = 'latest';
        break;
      case '/color':
        scrollTop();
        actName = 'color/setView';
        param = 'color';
        break;
      case '/portfolio':
        actName = 'color/getPortfolio';
        param = 'portfolio';
        break;
      case '/like':
        actName = 'color/getLike';
        param = 'like';
        break;
      default:
        break;
    }

    if(actName){
      const ac = createAction(actName);
      store.dispatch(ac(param));
    }

    callback();

  };

  const initView = (nextState, replace, callback) => {
    let viewName = nextState.location.pathname.substring(1);
    setView(viewName);
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

      <IndexRoute component={Color} onEnter={initBoxes}/>
      <Route path="/color/:id" component={Color} onEnter={initBoxes} />
      <Route path="/latest" component={Color} onEnter={initBoxes} />
      <Route path="/portfolio" component={Color} onEnter={initBoxes} />
      <Route path="/like" component={Color} onEnter={initBoxes} />

      <Route path="/new" component={NewColor} onEnter={initView}/>
      <Route path="/extract" component={NewColor} onEnter={initView}/>
      <Route path="/resourceapi" component={ResourceApi} onEnter={initView}/>
      <Route path="/about" component={About} onEnter={initView}/>

      <Route path="/adminpanel" component={AdminPanel} onEnter={initAdmin} />

      <Route path="*" component={ErrorPage} onEnter={initView}/>
    </Route>
  </Router>;
};


Routes.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export default Routes;
