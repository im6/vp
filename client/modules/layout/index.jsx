import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.sass';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';

const Layout = ({ children }) => (
  <div className={styles.layout}>
    <Router>
      <Header />
      {children}
    </Router>
  </div>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
