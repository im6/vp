import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.sass';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import { Alert } from 'antd';

class Layout extends React.Component {
  render() {
    const result = (<div className={styles.layout} >
      <Router>
        <Header />
        <div style={{height: '60px'}} />
        <Alert
          message={
          <div>
            A &nbsp;
            <a href="http://www.colorpk.com" target="_blank">
              New version
            </a>&nbsp;
            of ColorPK just release!
          </div>
          }
          type="success"
          showIcon
          closable
        />

        { this.props.children}
      </Router>
    </div>);
    return result;
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
