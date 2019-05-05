import React from 'react';
import Box from '../Box';
import style from './style.sass';
import { noop } from '../../../../misc/util';

class OneColor extends React.Component {
  constructor(props){
    super(props);
    this.onLikeClick = this.onLikeClick.bind(this);
    this.onDownload = this.onDownload.bind(this);
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }
  onLikeClick(data){
    this.props.onLike(data);
  }
  onDownload(){
    this.props.onDownload(this.props.selected);
  }
  render(){
    const { liked, selected } = this.props;
    if(!selected) return null;
    return <div className={style.center}>
      <div>
        <Box
          liked={liked}
          boxInfo={selected}
          onLikeClick={this.onLikeClick}
          onCanvasClick={noop}
        />
        <div className={style.center}>
          <button
            onClick={this.onDownload}
            className='button is-fullwidth is-info'
          >
            Download
          </button>
        </div>
      </div>
    </div>
  }
}

export default OneColor;