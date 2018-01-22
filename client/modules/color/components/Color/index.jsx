import React from 'react';
import { Card, Icon, Row, Col, Button } from 'antd';
import classnames from 'classnames';
import QueueAnim from 'rc-queue-anim';
import Box from '../Box';
import SpinLoader from '../SpinLoader';
import HeadBanner from '../HeadBanner';
import style from './style.less';
import { downloadCanvas } from '../../../../misc/util.js';
import Global from '../../../../config/global.js';

const { ISMOBILE } = Global;

class Color extends React.Component {
  onLikeClickHandler(id, btnStatus){
    const me = this;
    me.props.onLike(id, btnStatus);
  }

  render() {
    const me = this;
    const listClass = {};
    listClass[style.pcPadding] = !ISMOBILE;
    listClass[style.list] = true;
    const clsStr = classnames(listClass);
    const selected = me.props.selectedIndex;

    let downloadUrl = 'javascript:void(0)';
    if(selected > -1) {
      downloadUrl = downloadCanvas(me.props.list.getIn([selected, 'color']));
    }


    return (<div>
      <HeadBanner
        colorSize={me.props.list.size}
        colorView={me.props.view}
        />

      {
        selected >= 0 ?
          (
            <div className={style.selectedBox}>
              <Box
                boxInfo={me.props.list.get(selected)}
                width="100%"
                onLikeClick={me.onLikeClickHandler.bind(me, me.props.list.getIn([selected, 'id']))}
                />
              <br/>
              <div style={{textAlign: 'center'}}>
                <a href={downloadUrl} download="colorpk_download.png">
                  <Button size="large" type="default" icon="download">Download</Button>
                </a>
              </div>
            </div>
          ) : null

      }

      <QueueAnim type="top"
                 duration={300}
                 interval={100}
                 className={clsStr}>
        {
          me.props.list.map((v, k) => {
            return (<Col xs={12}
                         sm={12}
                         md={8}
                         lg={6}
                         key={k}
                         className={style.colContainer}>
              <Box
                boxInfo={v}
                onLikeClick={me.onLikeClickHandler.bind(me, v.get('id'))}
                />
            </Col>);
          })
        }
      </QueueAnim>
      { me.props.loading ? <SpinLoader /> : <div style={{height: 60}}/> }
    </div>);
  }
}

export default Color;
