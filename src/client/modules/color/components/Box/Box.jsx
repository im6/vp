import { useMemo } from 'react';
import PropTypes from 'prop-types';
import * as style from './style.sass';
import HeartButton from './components/HeartButton';
import ColorCanvas from './components/ColorCanvas';

const Box = ({
  id,
  value,
  starNum,
  starred,
  username,
  vertical,
  showUsername,
  onClickText = () => {},
  onClickHeart,
  onClickCanvas = () => {},
}) => {
  const onClickHeartLocal = () => {
    onClickHeart({
      willLike: !starred,
      id,
    });
  };
  const onClickCanvasLocal = () => {
    onClickCanvas(id);
  };
  const canvasMemo = useMemo(
    () => (
      <ColorCanvas
        vertical={vertical}
        colorValue={value}
        onClickText={onClickText}
        onClickCanvas={onClickCanvasLocal}
      />
    ),
    [vertical, value]
  );
  const btnMemo = useMemo(
    () => (
      <HeartButton
        starred={starred}
        starNum={starNum}
        onClick={onClickHeartLocal}
      />
    ),
    [starred, starNum]
  );
  return (
    <div className={style.box}>
      {canvasMemo}
      {btnMemo}
      {showUsername && username && <p>{username}</p>}
    </div>
  );
};

Box.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string,
  starNum: PropTypes.number,
  value: PropTypes.string.isRequired,
  starred: PropTypes.bool,
  vertical: PropTypes.bool,
  showUsername: PropTypes.bool,
  onClickHeart: PropTypes.func.isRequired,
  onClickText: PropTypes.func,
  onClickCanvas: PropTypes.func,
};

export default Box;
