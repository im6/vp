import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.sass';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';

class Layout extends React.Component {
  render() {
    const result = (<div className={styles.layout} >
      <Router>
        <Header />
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
