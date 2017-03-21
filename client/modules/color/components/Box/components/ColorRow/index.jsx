import React, {PropTypes} from 'react';
import { Button } from 'antd';
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

ColorRow.propTypes = {
  rowColor: PropTypes.string.isRequired
};

export default ColorRow;