import Modal from './components/Modal';
import useModal from './useModal';

const ModalContainer = () => {
  const modal = useModal();
  return <Modal {...modal} />;
};

export default ModalContainer;
