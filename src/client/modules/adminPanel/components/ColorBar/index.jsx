import React from 'react';
import PropTypes from 'prop-types';
import style from './style.sass';

const ColorBar = ({ value }) => (
  <div>
    {value.split('#').map((v, k) => (
      <div
        key={k}
        className={style.oneBar}
        style={{ backgroundColor: '#' + v }}
      />
    ))}
  </div>
);

ColorBar.propTypes = {
  value: PropTypes.string.isRequired,
};

export default ColorBar;
