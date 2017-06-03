import React from 'react';
import { Card, Icon, Row, Col } from 'antd';
import classnames from 'classnames';
import QueueAnim from 'rc-queue-anim';
import Box from '../Box';
import SpinLoader from '../SpinLoader';
import HeadBanner from '../HeadBanner';
import style from './style.less';

class Color extends React.Component {
  onLikeClickHandler(id, btnStatus){
    const me = this;
    me.props.onLike(id, btnStatus);
  }

  render() {
    const me = this;
    const im = me.props.isMobile;
    const listClass = {};
    listClass[style.pcPadding] = !im;
    listClass[style.list] = true;
    const clsStr = classnames(listClass);

    return (<div>
      <HeadBanner
        colorSize={me.props.list.size}
        colorView={me.props.view}
        />

      {
        me.props.selectedIndex >= 0 ?
          (
            <div className={style.selectedBox}>
              <Box boxInfo={me.props.list.get(me.props.selectedIndex)}
                   boxWidth={im? 70: 30}
                   isMobile={im}
                   onLikeClick={me.onLikeClickHandler.bind(me, me.props.list.getIn([me.props.selectedIndex, 'id']))} />
            </div>
          ) : null

      }

      <QueueAnim type="scale"
                 duration={280}
                 interval={80}
                 className={clsStr}>
        {
          me.props.list.map((v, k) => {
            return (<Col xs={12}
                         sm={12}
                         md={8}
                         lg={6}
                         key={k}
                         className={style.colContainer}>
              <Box boxInfo={v}
                   boxWidth={me.props.boxWidth}
                   isMobile={im}
                   onLikeClick={me.onLikeClickHandler.bind(me, v.get('id'))} />
            </Col>);
          })
        }
      </QueueAnim>
      { me.props.loading ? <SpinLoader /> : <div style={{height: 60}}/> }
    </div>);
  }
}

export default Color;
