import React from 'react';
import PropTypes from 'prop-types';
import style from './style.sass';
import LikeButton from './components/LikeButton';
import ColorCanvas from './components/ColorCanvas';

const Box = ({
  liked,
  id,
  value,
  likeNum,
  username,
  vertical,
  showUsername,
  onLikeClick,
  onCanvasClick,
}) => {
  const onLikeClickLocal = () => {
    onLikeClick({
      willLike: !liked,
      id,
    });
  };
  const onCanvasClickLocal = () => {
    onCanvasClick(id);
  };
  return (
    <div className={style.box}>
      <ColorCanvas
        vertical={vertical}
        colorValue={value}
        onClick={onCanvasClickLocal}
      />
      <LikeButton liked={liked} likeNum={likeNum} onToggle={onLikeClickLocal} />
      {showUsername && username && <p>{username}</p>}
    </div>
  );
};

Box.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string,
  likeNum: PropTypes.number,
  value: PropTypes.string.isRequired,
  liked: PropTypes.bool,
  vertical: PropTypes.bool,
  showUsername: PropTypes.bool,
  onLikeClick: PropTypes.func.isRequired,
  onCanvasClick: PropTypes.func.isRequired,
};

Box.defaultProps = {
  onCanvasClick: () => {},
};

export default Box;
