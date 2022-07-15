import { useSelector } from 'react-redux';
import style from './style.sass';
import Portal from './components/Portal';
import StatusIcon from './components/StatusIcon';

// all types: ['link', 'info', 'danger', 'warning', 'success', 'primary'];

const Modal = () => {
  const { visible, type, message } = useSelector(({ modal }) => modal);
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

export default Modal;
