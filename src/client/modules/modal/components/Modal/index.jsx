import PropTypes from 'prop-types';
import style from './style.sass';
import Portal from '../Portal';
import StatusIcon from '../StatusIcon';

const Modal = ({ visible, type, message }) => {
  if (!type) return null;
  const statusStyle = visible ? style.visible : style.hidden;
  return (
    <Portal>
      <div className={`notification is-${type} ${style.box} ${statusStyle}`}>
        <StatusIcon type={type} />
        <div className={style.text}>{message}</div>
      </div>
    </Portal>
  );
};
Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
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
