import React from 'react';
import { connect } from 'react-redux';
import { createAction } from 'redux-actions';
import { browserHistory } from 'react-router';
import NewColor from './components/NewColor';

const mapStateToProps = ({colorType, user, routing}) => {
  const routePath = routing.locationBeforeTransitions.pathname;
  const showUpload = routePath === '/extract';
  return {
    showUpload,
    routePath,
    colorType,
    user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd(colorValue, colorType) {
      const cl0 = colorValue.map(v =>{
        return v.substr(1);
      });

      const ac = createAction('color/addNew');
      dispatch(ac({
        color : cl0.join('#'),
        colorType: colorType.join(','),
      }));
    },
    onRedirect(){
      browserHistory.push('/');
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewColor);