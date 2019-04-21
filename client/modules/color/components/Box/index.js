import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import style from './style.sass';
import ColorCanvas from './components/ColorCanvas';
import { ISMOBILE } from '../../../../config/global';

const BTNSIZE = ISMOBILE ? 'small': 'default';

class Box extends React.Component {
  constructor(props){
    super(props);
    this.onLikeClick = this.onLikeClick.bind(this);
    this.onCanvasClick = this.onCanvasClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.liked !== this.props.liked;
  }

  onLikeClick() {
    this.props.onLikeClick({
      willLike: !this.props.liked,
      id: this.props.boxInfo.get('id').toString(),
    });
  }

  onCanvasClick() {
    this.props.onCanvasClick(this.props.boxInfo);
  }

  render() {
    const likeStyle = {};
    // console.log(this.props.boxInfo.get('id'));
    likeStyle[style.hasLike] = this.props.liked;
    return <div
      className={style.box}
      >
        <ColorCanvas 
          colorValue={this.props.boxInfo.get('color')}
          onClick={this.onCanvasClick}
        />
        <div className={style.boxFooter}>
          <Button
            className={style.btnText}
            size={BTNSIZE}
            onClick={this.onLikeClick}>
            <Icon type="heart" className={likeStyle}/>
              &nbsp;
              {this.props.boxInfo.get('like')}
          </Button>
          {
            this.props.boxInfo.get('username') && <h3>{this.props.boxInfo.get('username')}</h3>
          }
        </div>
    </div>;
  }
}

Box.propTypes = {
  boxInfo: PropTypes.object.isRequired,
  onLikeClick: PropTypes.func.isRequired,
  liked: PropTypes.bool,
};

export default Box;