import React from 'react';
import PropTypes from 'prop-types';
import './style.sass';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

const Layout = ({ children }) => (
  <div className="cpk-i3de6">
    <BrowserRouter>
      <Header />
      {children}
    </BrowserRouter>
  </div>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
