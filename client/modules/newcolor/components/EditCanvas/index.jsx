import React from 'react';
import { Button } from 'antd';
import classnames from 'classnames';
import style from './style.less';
import ColorRow from './components/ColorRow';


class EditCanvas extends React.Component {
  constructor(props) {
    super(props);
    let me = this;
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }

  render() {
    let me = this;
    return <div className={style.box}>
        <div className={style.boxCanvas}>
          {me.props.colorValue.map((v, k) => {
            return <ColorRow key={k}
                             colorValue={v}
                             isActive ={k === me.props.activeIndex}
                             onRowClick={me.props.changeActive.bind(me, k)} />
          })}
        </div>
    </div>;
  }
}

export default EditCanvas;