import React from 'react';
import PropTypes from 'prop-types';
import style from './style.sass';

const disableBubble = evt => {
  evt.stopPropagation();
};
const ColorRow = ({ color }) => (
  <li className={style.rowContainer} style={{ backgroundColor: color }}>
    <h1 className={style.text} onClick={disableBubble}>
      {color}
    </h1>
  </li>
);

ColorRow.propTypes = {
  color: PropTypes.string.isRequired,
};

export default ColorRow;
