import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import style from './style.sass';
import Portal from './components/Portal';
import StatusIcon from './components/StatusIcon';

const visibleTimeout = 2000;
const Modal = ({ type, message, time }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!visible && typeof message === 'string' && message.length > 0) {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, visibleTimeout);
    }
  }, [time]);

  return (
    visible && (
      <Portal>
        <div className={`notification is-${type} ${style.box}`}>
          <StatusIcon type={type} />
          <div className={style.text}>{message}</div>
        </div>
      </Portal>
    )
  );
};

Modal.propTypes = {
  time: PropTypes.number.isRequired,
  message: PropTypes.string,
  type: PropTypes.string,
};

export default Modal;
