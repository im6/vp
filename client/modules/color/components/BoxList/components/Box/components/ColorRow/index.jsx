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
    return <div style={{'background-color': me.props.rowColor}}
                onMouseEnter={me.hoverHandler.bind(me)}
                onMouseLeave={me.leaveHandler.bind(me)}>

      {me.state.showText ? <span className={style.fade}>{me.props.rowColor}</span> : null}

    </div>
  }
}

export default ColorRow;