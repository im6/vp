import React from 'react';
import { connect } from 'react-redux';
import { createAction } from 'redux-actions';
import { browserHistory } from 'react-router';
import NewColor from './components/NewColor';

const mapStateToProps = ({colorType, user, routing}) => {
  const routePath = routing.locationBeforeTransitions.pathname;
  const showUpload = routePath === '/extract';
  const isAuth = user.get('isAuth');
  return {
    showUpload,
    routePath,
    colorType,
    isAuth,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd(colorValue, colorType) {
      const cl0 = colorValue.map(v =>{
        return v.substr(1);
      });

      const ac = createAction('color/addNew');
      const colorStr = cl0.join('#');
      if(colorStr.length === 27) {
        dispatch(ac({
          color : colorStr,
          colorType: colorType.join(','),
        }));
      } else {
        console.error("illegal color value size")
      }
    },
    onRedirect(){
      browserHistory.push('/');
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewColor);