import { connect } from 'react-redux';
import Modal from './Modal';

const mapStateToProps = ({ modal }) => ({
  ...modal,
  time: Date.now(),
});

export default connect(mapStateToProps)(Modal);
