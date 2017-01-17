import React from 'react';
import { Button, Icon } from 'antd';
import classnames from 'classnames';
import style from './style.less';
import ColorRow from '../ColorRow';
import Immutable from 'immutable';


class ColorCanvas extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }

  shouldComponentUpdate(nextProps, nextState){
    let me = this;
    return me.props.colorValue != nextProps.colorValue;
  }

  render() {
    let me = this;
    return <div className={style.boxCanvas}>
      {me.props.colorValue.split('#').map((v, k) => {
        return <ColorRow
          key={k}
          rowColor={'#' + v} />
      })}
    </div>;
  }
}

export default ColorCanvas;