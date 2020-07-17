import { connect } from 'react-redux';
import Modal from './Modal';

const mapStateToProps = ({ modal }) => modal;

export default connect(mapStateToProps)(Modal);
