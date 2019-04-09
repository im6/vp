import React from 'react';
import { Button } from 'antd';
import classnames from 'classnames';
import Box from '../Box';
import SpinLoader from '../SpinLoader';
import HeadBanner from '../HeadBanner';
import style from './style.less';
import { downloadCanvas } from '../../../../misc/util.js';
import Global from '../../../../config/global.js';

const { ISMOBILE } = Global;

class Color extends React.Component {
  constructor(props) {
    super(props);
    this.onEnterClick = this.onEnterClick.bind(this);
    this.onLikeClick = this.onLikeClick.bind(this);
  }

  onLikeClick(newState){
    const { id, willLike } = newState;
    this.props.onLike(id, willLike);
  }

  onEnterClick(id) {
    this.props.onEnter(id);
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
                onLikeClick={me.onLikeClick}
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

{
          me.props.list.map((v) => {
            return <Box key={v.get('id')}
              boxInfo={v}
              onLikeClick={this.onLikeClick}
              onCanvasClick={this.onEnterClick}
            />;
          })
        }
      { me.props.loading ? <SpinLoader /> : <div style={{height: 60}}/> }
    </div>);
  }
}

export default Color;
