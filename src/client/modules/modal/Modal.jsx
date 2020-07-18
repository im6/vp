import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import style from './style.sass';
import Portal from './Portal';
import InfoIcon from './icons/InfoIcon';
import CheckIcon from './icons/CheckIcon';
import ExclamationIcon from './icons/ExclamationIcon';

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

  let icon;
  if (type === 'link' || type === 'info') {
    icon = <InfoIcon />;
  } else if (type === 'danger' || type === 'warning') {
    icon = <ExclamationIcon />;
  } else if (type === 'primary' || type === 'success') {
    icon = <CheckIcon />;
  }

  return (
    visible && (
      <Portal>
        <div className={`notification is-${type} ${style.box}`}>
          {icon}
          <div className={style.text}>{message}</div>
        </div>
      </Portal>
    )
  );
};

Modal.propTypes = {
  time: PropTypes.number.isRequired,
  message: PropTypes.string,
  type: PropTypes.oneOf([
    'link',
    'info',
    'danger',
    'warning',
    'success',
    'primary',
  ]),
};

export default Modal;
