import PropTypes from 'prop-types';
import style from './style.sass';
import Portal from '../Portal';
import StatusIcon from '../StatusIcon';

const Modal = ({ type, message }) => {
  if (!type) return null;
  return (
    <Portal>
      <div className={`notification is-${type} ${style.box}`}>
        <StatusIcon type={type} />
        <div className={style.text}>{message}</div>
      </div>
    </Portal>
  );
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
};

export default Modal;
