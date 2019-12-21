import React from 'react';
import PropTypes from 'prop-types';
import style from './style.sass';
import Heart from './components/Heart';
import ColorCanvas from './components/ColorCanvas';

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.onLikeClick = this.onLikeClick.bind(this);
    this.onCanvasClick = this.onCanvasClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { liked, boxInfo } = this.props;
    return (
      nextProps.liked !== liked ||
      nextProps.boxInfo.get('id') !== boxInfo.get('id')
    );
  }

  onLikeClick() {
    const { liked, boxInfo, onLikeClick } = this.props;
    onLikeClick({
      willLike: !liked,
      id: boxInfo.get('id'),
    });
  }

  onCanvasClick() {
    const { boxInfo, onCanvasClick } = this.props;
    onCanvasClick(boxInfo);
  }

  render() {
    const { liked, boxInfo, showUsername } = this.props;
    return (
      <div className={style.box}>
        <ColorCanvas
          colorValue={boxInfo.get('color')}
          onClick={this.onCanvasClick}
        />
        <button
          className="button is-small"
          onClick={this.onLikeClick}
          aria-label="click and save"
        >
          <Heart red={liked} />
          &nbsp;&nbsp;
          {boxInfo.get('like')}
        </button>
        {showUsername && boxInfo.get('username') && (
          <p>{boxInfo.get('username')}</p>
        )}
      </div>
    );
  }
}

Box.propTypes = {
  boxInfo: PropTypes.object.isRequired,
  onLikeClick: PropTypes.func.isRequired,
  liked: PropTypes.bool,
  showUsername: PropTypes.bool,
};

export default Box;
