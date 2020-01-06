import React from 'react';
import PropTypes from 'prop-types';
import style from './style.sass';
import ColorRow from '../ColorRow';

const ColorCanvas = ({ onClick, colorValue, vertical }) => (
  <ul
    className={vertical ? style.boxCanvas1 : style.boxCanvas}
    onClick={onClick}
  >
    {colorValue.split('#').map(v => {
      return <ColorRow key={v} color={'#' + v} />;
    })}
  </ul>
);

ColorCanvas.propTypes = {
  colorValue: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  vertical: PropTypes.bool,
};

export default ColorCanvas;
