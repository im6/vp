import React from 'react';
import PropTypes from 'prop-types';

const ToggleButton = ({ onClick }) => (
  <a
    role="nav toggle btn"
    className="navbar-burger burger"
    aria-label="nav menu"
    aria-expanded="false"
    onClick={onClick}
  >
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
  </a>
);

ToggleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ToggleButton;
