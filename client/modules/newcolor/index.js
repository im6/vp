import React from 'react';
import { connect } from 'react-redux';
import { createAction } from 'redux-actions';
import { withRouter } from 'react-router-dom'
import NewColor from './components/NewColor';

const mapStateToProps = ({ user }, { location: { pathname } }) => {
  const showUpload = pathname === '/extract';
  const isAuth = user.get('isAuth');
  return {
    showUpload,
    isAuth,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd(colorValue) {
      const cl0 = colorValue.map(v =>{
        return v.substr(1);
      });

      const ac = createAction('color/addNew');
      const color = cl0.join('#');
      if(color.length === 27) {
        dispatch(ac({
          color,
        }));
      } else {
        console.error("illegal color value size")
      }
    },
    onRedirect(){
      
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewColor));