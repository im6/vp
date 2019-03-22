import React from 'react';
import PropTypes from 'prop-types';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    const me = this;
  }
  render() {
    const me = this;
    const result = (<div>
      <h1>this is layout</h1>

    </div>);

    return result;
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
