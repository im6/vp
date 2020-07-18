import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './style.sass';
import Portal from './Portal';

const Modal = ({ type, message, time }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (typeof message === 'string' && message.length > 0) {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 2200);
    }
  }, [time]);

  return (
    visible && (
      <Portal>
        <div className={`notification is-${type} ${style.box}`}>{message}</div>
      </Portal>
    )
  );
};

Modal.propTypes = {
  time: PropTypes.number.isRequired,
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
