import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import classnames from 'classnames';
import style from './style.less';
import ColorCanvas from './components/ColorCanvas';
import Immutable from 'immutable';



class Box extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }

  shouldComponentUpdate(nextProps, nextState){
    let me = this;
    return !Immutable.is(me.props.boxInfo, nextProps.boxInfo);
  }
  onClickHander(a,b,c,d){
    let me = this;
    me.props.onLikeClick({
      willLike: !me.props.boxInfo.get('liked'),
      id: me.props.boxInfo.get('id')
    });
  }

  render() {
    let me = this;
    let bWidth = me.props.boxWidth || 90;
    let likeStyle = {};
    likeStyle[style.hasLike] = me.props.boxInfo.get('liked') || false;
    let likeIcon = me.props.boxInfo.get('liked') ? 'heart' : 'heart-o';


    let btnSize = me.props.isMobile ? 'small': 'default';
    let boxHt = me.props.isMobile ? 230 : 280;

    return <div className={style.box} style={{width: bWidth + '%', height: boxHt}}>
        <ColorCanvas
          colorId={me.props.boxInfo.get('id')}
          colorValue={me.props.boxInfo.get('color')}/>
        <div className={style.boxFooter}>
          <Button
            type="default"
            size={btnSize}
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
  isMobile: PropTypes.bool,
  boxWidth: PropTypes.number
};

export default Box;