import React from 'react';
import PropTypes from 'prop-types';
import style from './style.sass';
import ColorRow from '../ColorRow';

const ColorCanvas = ({ colorValue, vertical, onClickCanvas, onClickText }) => (
  <ul
    className={vertical ? style.boxCanvas1 : style.boxCanvas}
    onClick={onClickCanvas}
  >
    {colorValue.split('#').map((v) => {
      return <ColorRow key={v} color={'#' + v} onClickText={onClickText} />;
    })}
  </ul>
);

ColorCanvas.propTypes = {
  colorValue: PropTypes.string.isRequired,
  onClickText: PropTypes.func.isRequired,
  onClickCanvas: PropTypes.func.isRequired,
  vertical: PropTypes.bool,
};

export default ColorCanvas;
