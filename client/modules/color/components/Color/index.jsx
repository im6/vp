import React from 'react';
import { Card, Icon, Row, Col } from 'antd';
import classnames from 'classnames';
import QueueAnim from 'rc-queue-anim';
import Box from '../Box';
import SpinLoader from '../SpinLoader';
import HeadBanner from '../HeadBanner';
import style from './style.less';
import { downloadCanvas } from '../../../../misc/util.js';

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
    const selected = me.props.selectedIndex;
    const selectedWidth = im ? 250 : 270;

    let downloadUrl = 'javascript:void(0)';
    if(selected > -1) {
      downloadUrl = downloadCanvas(me.props.list.getIn([selected, 'color']));
    }


    return (<div style={{minHeight: 1500}}>
      <HeadBanner
        colorSize={me.props.list.size}
        colorView={me.props.view}
        />

      {
        selected >= 0 ?
          (
            <div className={style.selectedBox}>
              <div>
                <Box boxInfo={me.props.list.get(selected)}
                     boxWidth={selectedWidth}
                     isMobile={im}
                     onLikeClick={me.onLikeClickHandler.bind(me, me.props.list.getIn([selected, 'id']))}
                  />
                <br/>
                <div style={{textAlign: 'center'}}>
                  <a href={downloadUrl} download="colorpk_download.png">Download</a>
                </div>
              </div>
            </div>
          ) : null

      }

      <QueueAnim type="top"
                 duration={300}
                 interval={135}
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
