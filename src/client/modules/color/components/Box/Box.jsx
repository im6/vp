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
  onClickLike,
  onClickText,
  onClickCanvas,
}) => {
  const onClickLikeLocal = () => {
    onClickLike({
      willLike: !liked,
      id,
    });
  };
  const onClickCanvasLocal = () => {
    onClickCanvas(id);
  };
  return (
    <div className={style.box}>
      <ColorCanvas
        vertical={vertical}
        colorValue={value}
        onClickText={onClickText}
        onClickCanvas={onClickCanvasLocal}
      />
      <LikeButton liked={liked} likeNum={likeNum} onToggle={onClickLikeLocal} />
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
  onClickLike: PropTypes.func.isRequired,
  onClickText: PropTypes.func.isRequired,
  onClickCanvas: PropTypes.func.isRequired,
};

Box.defaultProps = {
  onClickText: () => {},
  onClickCanvas: () => {},
};

export default Box;
