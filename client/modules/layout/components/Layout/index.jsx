import React from 'react';
import PropTypes from 'prop-types';
//import Slideout from 'slideout';
import styles from './style.less';
// import './slideout.css';

//import SlideoutMenu from '../SlideoutMenu';

import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../Header';

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const result = (<div className={styles.layoutBox} >
      <Router>
        <Header />
        <div style={{height: '60px'}} />
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
