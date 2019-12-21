import React from 'react';
import PropTypes from 'prop-types';
import style from './style.sass';
import ColorRow from '../ColorRow';

const ColorCanvas = ({ onClick, colorValue }) => (
  <div className={style.boxCanvas} onClick={onClick}>
    {colorValue.split('#').map(v => {
      return <ColorRow key={v} color={'#' + v} />;
    })}
  </div>
);

ColorCanvas.propTypes = {
  colorValue: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default ColorCanvas;
