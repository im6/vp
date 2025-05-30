import PropTypes from 'prop-types';
import * as style from './style.sass';

const ColorRow = ({ color, onClickText }) => {
  const onClickTextLocal = (evt) => {
    onClickText(evt.target.innerText);
    evt.stopPropagation();
  };
  return (
    <li className={style.rowContainer} style={{ backgroundColor: color }}>
      <span
        aria-hidden="true"
        className={style.text}
        onClick={onClickTextLocal}
      >
        {color}
      </span>
    </li>
  );
};

ColorRow.propTypes = {
  color: PropTypes.string.isRequired,
  onClickText: PropTypes.func.isRequired,
};

export default ColorRow;
