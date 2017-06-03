import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Icon } from 'antd';
import style from './style.less';

const ColorRow = ({ rowColor, colorId }) => (
  <div className={style.rowContainer}
       style={{'backgroundColor': rowColor}}
    >
  {
    colorId ? (<Link
      to={`/color/${colorId}`}
      className={style.text}>
      <Icon type="export" />
    </Link>) : <div />
  }

  <h1 className={style.text}>
    {rowColor}
  </h1>
</div>);

ColorRow.propTypes = {
  rowColor: PropTypes.string.isRequired
};

export default ColorRow;