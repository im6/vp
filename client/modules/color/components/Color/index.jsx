import React from 'react';
import Box from '../Box';
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
    return (<div className={style.list}>
        {
          this.props.list.map((v) => {
            return <Box key={v.get('id')}
              boxInfo={v}
              onLikeClick={this.onLikeClick}
              onCanvasClick={this.onEnterClick}
            />;
          })
        }
    </div>);
  }
}

export default Color;
