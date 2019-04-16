import React from 'react';
import Box from '../Box';
import SpinLoader from '../SpinLoader';
import HeadBanner from '../HeadBanner';
import style from './style.less';

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
    return (<div>
      <HeadBanner
        colorSize={this.props.list.size}
        colorView={this.props.view}
        />
        { this.props.loading || true ? <SpinLoader /> : <div style={{height: 60}}/> }
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
      
    </div>);
  }
}

export default Color;
