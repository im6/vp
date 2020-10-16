import PropTypes from 'prop-types';
import style from './style.sass';
import ColorRow from './ColorRow';

const EditCanvas = ({ colorValue, activeIndex, onClickRow }) => {
  const onRowClickLocal = (v) => () => onClickRow(v);
  return (
    <div className={style.box}>
      <div className={style.boxCanvas}>
        {colorValue.map((v, k) => (
          <ColorRow
            key={k}
            colorValue={v}
            isActive={k === activeIndex}
            onRowClick={onRowClickLocal(k)}
          />
        ))}
      </div>
    </div>
  );
};

EditCanvas.propTypes = {
  colorValue: PropTypes.array.isRequired,
  onClickRow: PropTypes.func.isRequired,
  activeIndex: PropTypes.number,
};

export default EditCanvas;
