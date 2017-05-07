import React, {PropTypes} from 'react';
import { Button, Icon } from 'antd';
import { Link } from 'react-router';
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
      {
        me.props.colorId ? <Link to={`/color/${me.props.colorId}`}
                                 className={style.text}>
          <Icon type="export" />
        </Link> : <div />
      }

      <h1 className={style.text}>
        {me.props.rowColor}
      </h1>
    </div>
  }
}

ColorRow.propTypes = {
  rowColor: PropTypes.string.isRequired
};

export default ColorRow;