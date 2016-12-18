import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import { Global } from '../config/global';

import App from '../modules/app/index.jsx';
import ErrorPage from '../modules/errorPage';
import Hello from '../modules/hello';
import Support from '../modules/support';
import Auth from '../modules/auth';



const Routes = ({ history, store }) => {

  const checkAuth = (nextState, replace, callback) => {
    if(Global.isDev){
      callback();
    }else{
      let isAuth = store.getState().auth.get('isAuth');
      if(!isAuth && nextState.routes[0].path != '/auth'){
        replace('/auth');
      }
      callback();
    }
  };

  return <Router history={history} >
    <Route path="/auth"
           component={Auth}
      />
    <Route path="/"
           component={App}
           onEnter={checkAuth}>
      <IndexRoute component={Hello}/>
      <Route path="support" component={Support} />
      <Route path="*" component={ErrorPage} />
    </Route>
  </Router>;
};


Routes.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export default Routes;
