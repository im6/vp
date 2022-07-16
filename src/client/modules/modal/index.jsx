import { useSelector } from 'react-redux';
import Modal from './components/Modal';

const ModalContainer = () => {
  const state = useSelector(({ modal }) => modal);
  return <Modal {...state} />;
};

export default ModalContainer;
