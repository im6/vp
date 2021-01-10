import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { tempDomId } from '../../../../../constant';

class Portal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.modalRootRef = document.getElementById(tempDomId);
  }

  componentDidMount() {
    this.modalRootRef.appendChild(this.el);
  }

  componentWillUnmount() {
    this.modalRootRef.removeChild(this.el);
  }

  render() {
    return createPortal(this.props.children, this.el);
  }
}

Portal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Portal;
