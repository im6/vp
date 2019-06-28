import React from 'react';
import PropTypes from 'prop-types';
import style from './style.sass';

const disableBubble = evt => {
  evt.stopPropagation();
};
const ColorRow = ({ color }) => (
  <div className={style.rowContainer} style={{ backgroundColor: color }}>
    <h1 className={style.text} onClick={disableBubble}>
      {color}
    </h1>
  </div>
);

ColorRow.propTypes = {
  color: PropTypes.string.isRequired,
};

export default ColorRow;
