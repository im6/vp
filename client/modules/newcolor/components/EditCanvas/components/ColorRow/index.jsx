import React from 'react';
import { Button } from 'antd';
import classnames from 'classnames';
import style from './style.less';

class ColorRow extends React.Component {
  constructor(props) {
    super(props);
    const me = this;
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }

  clickHandler(){
    const me = this;
    me.props.onRowClick();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const me = this;
    let isSame = nextProps.colorValue == me.props.colorValue && nextProps.isActive == me.props.isActive;
    return !isSame;
  }

  render() {
    const me = this;
    const rowStyle = (me.props.colorValue && me.props.colorValue != '#') ? {
      'backgroundColor': me.props.colorValue
    } : {
      border: `1px solid ${me.props.isActive ? '#1a4cb6' : '#cccccc'}`,
      backgroundImage: "url('data:image/png;base64,R0lGODdhCgAKAPAAAOXl5f///ywAAAAACgAKAEACEIQdqXt9GxyETrI279OIgwIAOw==')"
    };

    return <div className={style.rowContainer}
                style={rowStyle}
                onClick={me.props.onRowClick}>
    </div>
  }
}

export default ColorRow;