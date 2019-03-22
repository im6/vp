import React from 'react';
import Footer from './components/footer';
import Header from './components/header';
import PropTypes from 'prop-types';

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>
      <Header />
        { this.props.children }
      <Footer />
    </div>;
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
