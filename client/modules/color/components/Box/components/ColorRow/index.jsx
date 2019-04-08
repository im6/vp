import React from 'react';
import PropTypes from 'prop-types';
import style from './style.less';

const ColorRow = ({ color }) => (
  <div className={style.rowContainer}
       style={{'backgroundColor': color}}
    >
  <h1 className={style.text}>
    {color}
  </h1>
</div>);

ColorRow.propTypes = {
  color: PropTypes.string.isRequired,
};

export default ColorRow;