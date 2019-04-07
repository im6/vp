import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import style from './style.less';
import ColorCanvas from './components/ColorCanvas';

const BTNSIZE = 'default';
const BOXHT = 285
const BOXWD = 250

class Box extends React.Component {
  onClickHander() {
    const me = this;
    me.props.onLikeClick({
      willLike: !me.props.boxInfo.get('liked'),
      id: me.props.boxInfo.get('id')
    });
  }

  render() {
    const me = this;
    const likeStyle = {};
    likeStyle[style.hasLike] = me.props.boxInfo.get('liked') || false;
    const likeIcon = me.props.boxInfo.get('liked') ? 'heart' : 'heart-o';

    return <div
      className={style.box}
      style={{width: BOXWD, height: BOXHT}}
      >
        <ColorCanvas
          colorId={me.props.boxInfo.get('id')}
          colorValue={me.props.boxInfo.get('color')}/>
        <div className={style.boxFooter}>
          <Button
            size={BTNSIZE}
            onClick={me.onClickHander.bind(me)}>
            <h3 style={{display: 'inline'}}>
              <Icon type={likeIcon} className={likeStyle}/>
              &nbsp;&nbsp;
              {me.props.boxInfo.get('like')}
            </h3>
          </Button>
          {
            me.props.boxInfo.get('username') ?
              <h3>{me.props.boxInfo.get('username')}</h3> : null
          }
        </div>
    </div>;
  }
}

Box.propTypes = {
  boxInfo: PropTypes.object.isRequired,
  onLikeClick: PropTypes.func.isRequired,
};

export default Box;