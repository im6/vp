import React, { PropTypes } from 'react';
import { createAction } from 'redux-actions';
import { connect } from 'react-redux';

import '!style!css!font-awesome/css/font-awesome.min.css';

import styles from './style.less';
import img from '!file!./assets/gradient.jpg';
import HeaderCenter from './components/HeaderCenter/index.jsx';

const Layout = ({children, dispatch}) => {

  const logout = (v) => {
    const ac = createAction('auth/logoff');
    dispatch(ac());
  };

  var result = <div className={styles.layoutBox} >
    <HeaderCenter logout={logout}/>
    <div className={styles.main} style={{background: `#f5f6f7 url(${img}) repeat-x 0 0`}} >
      {children}
    </div>
  </div>;
  return result;
};


Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default connect()(Layout);
