import React from 'react';
import Head from './components/Head';
import PropTypes from 'prop-types';

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>
      <Head />
      { this.props.children }
      <Footer />
    </div>;
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
