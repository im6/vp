import React from 'react';
import PropTypes from 'prop-types';
import { languages } from '../../../translation';

const LanguageDropdown = ({ onChange }) => (
  <div className="navbar-dropdown">
    {languages.map(v => (
      <a
        className="navbar-item"
        key={v.code}
        onClick={() => {
          onChange(v.code);
        }}
      >
        {v.name}
      </a>
    ))}
  </div>
);

LanguageDropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default LanguageDropdown;
