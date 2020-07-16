import React from 'react';
import PropTypes from 'prop-types';
import style from './style.sass';

const Modal = ({ type, message }) => {
  const visible = typeof message === 'string' && message.length > 0;
  return (
    <div
      className={`notification is-${type} ${style.box} ${
        visible ? style.show : style.hide
      }`}
    >
      {message}
    </div>
  );
};

Modal.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf([
    'primary',
    'link',
    'info',
    'success',
    'warning',
    'danger',
  ]),
};

export default Modal;
