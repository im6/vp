import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import style from './style.less';
import ColorRow from '../ColorRow';

class ColorCanvas extends React.Component {
  shouldComponentUpdate(nextProps, nextState){
    const me = this;
    return me.props.colorValue !== nextProps.colorValue;
  }

  render() {
    const me = this;
    return <div className={style.boxCanvas}>
      {me.props.colorValue.split('#').map((v, k) => {
        return <ColorRow
          key={k}
          colorId={me.props.colorId}
          rowColor={'#' + v} />
      })}
    </div>;
  }
}

ColorCanvas.propTypes = {
  colorValue: PropTypes.string.isRequired
};


export default ColorCanvas;