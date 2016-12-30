import React from 'react';
import { Button } from 'antd';
import classnames from 'classnames';
import style from './style.less';


class ColorRow extends React.Component {
  constructor(props) {
    super(props);
    let me = this;
    me.state = {
      showText : false
    };
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }

  hoverHandler(){
    let me = this;
    me.setState({
      showText: true
    });
  }

  leaveHandler(){
    let me = this;
    me.setState({
      showText: false
    });
  }

  render() {
    let me = this;
    return <div className={style.rowContainer}
                style={{'backgroundColor': me.props.rowColor}}
                onMouseEnter={me.hoverHandler.bind(me)}
                onMouseLeave={me.leaveHandler.bind(me)}>

      <span className={style.text}
        style={{'opacity': me.state.showText ? 1 : 0}}>
        {me.props.rowColor}
      </span>
    </div>
  }
}

export default ColorRow;