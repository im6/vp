import React, { PropTypes } from 'react';
import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

import '!style!css!font-awesome/css/font-awesome.min.css';

import styles from './style.less';
import img from '!file!./assets/gradient.jpg';
import Footer from './components/footer/index.jsx';
import Header from './components/header/index.jsx';
import Sidebar from './components/sidebar/index.jsx';


const Layout = ({children, dispatch}) => {

  const logout = (v) => {
    const ac = createAction('auth/logoff');
    dispatch(ac());
  };

  var result = <div className={styles.layoutBox} >
    <Header className={styles.header} logout={logout}/>
    <div className={styles.main} style={{background: `#f5f6f7 url(${img}) repeat-x 0 0`}} >
      <Row>
        <Col  xs={0} sm={0} md={1} lg={1} />
        <Col  xs={24} sm={24} md={7} lg={5} >
          <Sidebar />
        </Col>
        <Col  xs={24} sm={24} md={15} lg={17} >
          {children}
        </Col>
        <Col  xs={0} sm={0} md={1} lg={1} />
      </Row>
    </div>
    <Footer className={styles.footer} />
  </div>;
  return result;
};


Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default connect()(Layout);
