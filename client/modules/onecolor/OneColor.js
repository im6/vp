import React from 'react';
import Box from '../color/components/Box';
import { Button } from 'antd';
import style from './style.less';
import { noop } from '../../misc/util';

class OneColor extends React.Component {
  constructor(props){
    super(props);
    this.onLikeClick = this.onLikeClick.bind(this);
    this.onDownload = this.onDownload.bind(this);
  }
  onLikeClick(data){
    const { id, willLike } = data;
    this.props.onLike(id, willLike);
  }
  onDownload(){
    this.props.onDownload(this.props.selected);
  }
  render(){
    if(!this.props.selected) {
      return null;
    }
    return <div className={style.center}>
      <div>
        <Box key={this.props.selected.get('id')}
          boxInfo={this.props.selected}
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