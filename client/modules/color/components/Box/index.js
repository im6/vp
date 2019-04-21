import React from 'react';
import PropTypes from 'prop-types';
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
    return nextProps.liked !== this.props.liked ||
    nextProps.boxInfo.get('id') !== this.props.boxInfo.get('id');
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
    // console.log(this.props.boxInfo.get('id'));
    const heartUrl = `//dkny.oss-cn-hangzhou.aliyuncs.com/4/hrt${this.props.liked ? 'r': ''}.svg`
    return <div
      className={style.box}
      >
        <ColorCanvas 
          colorValue={this.props.boxInfo.get('color')}
          onClick={this.onCanvasClick}
        />
        <button
          className='button is-small'
          size={BTNSIZE}
          onClick={this.onLikeClick}>
            <img src={heartUrl} />
            {this.props.boxInfo.get('like')}
        </button>
        {
          this.props.boxInfo.get('username') && <p>{this.props.boxInfo.get('username')}</p>
        }
    </div>;
  }
}

Box.propTypes = {
  boxInfo: PropTypes.object.isRequired,
  onLikeClick: PropTypes.func.isRequired,
  liked: PropTypes.bool,
};

export default Box;