import React from 'react';
import { Button } from 'antd';
import classnames from 'classnames';
import style from './style.less';

class ColorRow extends React.Component {
  constructor(props) {
    super(props);
    let me = this;
  }

  render() {
    let me = this;
    return <div className={style.rowContainer}
                style={{'backgroundColor': me.props.rowColor}} >

      <span className={style.text}>
        {me.props.rowColor}
      </span>
    </div>
  }
}

export default ColorRow;