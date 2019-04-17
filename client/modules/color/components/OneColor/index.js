import React from 'react';
import Box from '../Box';
import { Button } from 'antd';
import style from './style.less';
import { noop } from '../../../../misc/util';

class OneColor extends React.Component {
  constructor(props){
    super(props);
    this.onLikeClick = this.onLikeClick.bind(this);
    this.onDownload = this.onDownload.bind(this);
  }
  onLikeClick(data){
    this.props.onLike(data);
  }
  onDownload(){
    this.props.onDownload(this.props.selected);
  }
  render(){
    const { liked, selected } = this.props;
    return <div className={style.center}>
      <div>
        <Box
          liked={liked}
          boxInfo={selected}
          onLikeClick={this.onLikeClick}
          onCanvasClick={noop}
        />
        <div className={style.center}>
          <Button icon='download'
            type='primary'
            onClick={this.onDownload}
            className={style.btn}
          >
            Download
          </Button>
        </div>
      </div>
    </div>
  }
}

export default OneColor;