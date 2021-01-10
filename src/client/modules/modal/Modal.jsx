import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import style from './style.sass';
import Portal from './components/Portal';
import StatusIcon from './components/StatusIcon';

const visibleTimeout = 2000; // same time as $timeout value in style file

const Modal = ({ content, onTimeout }) => {
  const timerRef = useRef(null);
  const { type, message } = content;

  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    []
  );
  useEffect(() => {
    if (!timerRef.current && type) {
      timerRef.current = setTimeout(() => {
        onTimeout();
      }, visibleTimeout);
    } else if (timerRef.current && !type) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    } else if (timerRef.current && type) {
      // new content kicks in during old content displaying
    } else {
      // idle
    }
  }, [content]);

  const visible = Boolean(type);
  return visible ? (
    <Portal>
      <div className={`notification is-${type} ${style.box}`}>
        <StatusIcon type={type} />
        <div className={style.text}>{message}</div>
      </div>
    </Portal>
  ) : null;
};

Modal.propTypes = {
  type: PropTypes.oneOf([
    'link',
    'info',
    'danger',
    'warning',
    'success',
    'primary',
  ]),
  message: PropTypes.string,
  onTimeout: PropTypes.func.isRequired,
};

export default Modal;
