import React, { memo } from 'react';
import PropTypes from 'prop-types';
import style from './style.sass';
import LikeButton from './components/LikeButton';
import ColorCanvas from './components/ColorCanvas';

const Box = ({
  liked,
  boxInfo,
  vertical,
  showUsername,
  onLikeClick,
  onCanvasClick,
}) => {
  const onLikeClickLocal = () => {
    onLikeClick({
      willLike: !liked,
      id: boxInfo.get('id'),
    });
  };
  const onCanvasClickLocal = () => {
    onCanvasClick(boxInfo);
  };
  return (
    <div className={style.box}>
      <ColorCanvas
        vertical={vertical}
        colorValue={boxInfo.get('color')}
        onClick={onCanvasClickLocal}
      />
      <LikeButton
        liked={liked}
        likeNum={boxInfo.get('like')}
        onToggle={onLikeClickLocal}
      />
      {showUsername && boxInfo.get('username') && (
        <p>{boxInfo.get('username')}</p>
      )}
    </div>
  );
};

Box.propTypes = {
  boxInfo: PropTypes.object.isRequired, // immutable object
  liked: PropTypes.bool,
  vertical: PropTypes.bool,
  showUsername: PropTypes.bool,
  onLikeClick: PropTypes.func.isRequired,
  onCanvasClick: PropTypes.func.isRequired,
};

Box.defaultProps = {
  onCanvasClick: () => {},
};

const isEqual = (prevProps, nextProps) => {
  const { liked, boxInfo, vertical } = prevProps;
  return (
    nextProps.liked === liked &&
    nextProps.boxInfo.get('id') === boxInfo.get('id') &&
    nextProps.vertical === vertical
  );
};

export default memo(Box, isEqual);
