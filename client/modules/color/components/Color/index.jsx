import React from 'react';
import { Button } from 'antd';
import classnames from 'classnames';
import Box from '../Box';
import SpinLoader from '../SpinLoader';
import HeadBanner from '../HeadBanner';
import style from './style.less';
import { downloadCanvas } from '../../../../misc/util.js';

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

  onEnterClick(color) {
    this.props.onEnter(color);
  }

  render() {
    const selected = this.props.selectedIndex;

    let downloadUrl = 'javascript:void(0)';
    if(selected > -1) {
      downloadUrl = downloadCanvas(this.props.list.getIn([selected, 'color']));
    }

    return (<div>
      <HeadBanner
        colorSize={this.props.list.size}
        colorView={this.props.view}
        />

      {
        selected >= 0 ?
          (
            <div className={style.selectedBox}>
              <Box
                boxInfo={this.props.list.get(selected)}
                width="100%"
                onLikeClick={this.onLikeClick}
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

      <div className={style.list}>
        {
          this.props.list.map((v) => {
            return <Box key={v.get('id')}
              boxInfo={v}
              onLikeClick={this.onLikeClick}
              onCanvasClick={this.onEnterClick}
            />;
          })
        }
      </div>
      { this.props.loading ? <SpinLoader /> : <div style={{height: 60}}/> }
    </div>);
  }
}

export default Color;
