import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import style from './style.less';
import ColorCanvas from './components/ColorCanvas';

const BTNSIZE = 'default';
const BOXHT = 285
const BOXWD = 250

class Box extends React.Component {
  constructor(props){
    super(props);
    this.onLikeClick = this.onLikeClick.bind(this);
    this.onCanvasClick = this.onCanvasClick.bind(this);
  }

  onLikeClick() {
    this.props.onLikeClick({
      willLike: !this.props.boxInfo.get('liked'),
      id: this.props.boxInfo.get('id')
    });
  }

  onCanvasClick() {
    this.props.onCanvasClick(this.props.boxInfo.get('id'));
  }

  render() {
    const likeStyle = {};
    likeStyle[style.hasLike] = this.props.boxInfo.get('liked') || false;

    return <div
      className={style.box}
      style={{width: BOXWD, height: BOXHT}}
      >
        <ColorCanvas 
          colorValue={this.props.boxInfo.get('color')}
          onClick={this.onCanvasClick}
        />
        <div className={style.boxFooter}>
          <Button
            size={BTNSIZE}
            onClick={this.onLikeClick}>
            <h3 style={{display: 'inline'}}>
              <Icon type="heart" className={likeStyle}/>
              &nbsp;&nbsp;
              {this.props.boxInfo.get('like')}
            </h3>
          </Button>
          {
            this.props.boxInfo.get('username') ?
              <h3>{this.props.boxInfo.get('username')}</h3> : null
          }
        </div>
    </div>;
  }
}

Box.propTypes = {
  boxInfo: PropTypes.object.isRequired,
  onLikeClick: PropTypes.func.isRequired,
};

export default Box;