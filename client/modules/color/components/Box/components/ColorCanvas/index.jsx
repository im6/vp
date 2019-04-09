import React from 'react';
import PropTypes from 'prop-types';
import style from './style.less';
import ColorRow from '../ColorRow';

class ColorCanvas extends React.Component {
  shouldComponentUpdate(nextProps, nextState){
    return this.props.colorValue !== nextProps.colorValue;
  }

  render() {
    return <div
      className={style.boxCanvas}
      onClick={this.props.onClick}
    >
      {this.props.colorValue.split('#').map((v) => {
        return <ColorRow
          key={v}
          color={'#' + v} />
      })}
    </div>;
  }
}

ColorCanvas.propTypes = {
  colorValue: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};


export default ColorCanvas;