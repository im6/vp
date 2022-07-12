import { connect } from 'react-redux';
import { createAction } from '@reduxjs/toolkit';
import Modal from './components/Modal';

const mapStateToProps = ({ modal }) => ({
  content: modal.toJSON(),
});

const mapDispatchToProps = (dispatch) => ({
  onTimeout(type) {
    const ac = createAction('modal/reset');
    dispatch(ac(type));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
