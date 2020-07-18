import React from 'react';
import PropTypes from 'prop-types';

const LanguageDropdown = ({ languages, onChange }) => (
  <div className="navbar-dropdown">
    {languages.map((v) => (
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
  languages: PropTypes.array.isRequired,
};

export default LanguageDropdown;
