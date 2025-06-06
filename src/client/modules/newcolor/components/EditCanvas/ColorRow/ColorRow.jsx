import PropTypes from 'prop-types';
import * as style from './style.sass';

const ColorRow = ({ onRowClick, colorValue, isActive }) => {
  const rowStyle =
    colorValue && colorValue != '#'
      ? {
          backgroundColor: colorValue,
        }
      : {
          border: `1px solid ${isActive ? '#1a4cb6' : '#cccccc'}`,
          backgroundImage:
            "url('data:image/png;base64,R0lGODdhCgAKAPAAAOXl5f///ywAAAAACgAKAEACEIQdqXt9GxyETrI279OIgwIAOw==')",
        };

  return (
    <div className={style.rowContainer} style={rowStyle} onClick={onRowClick} />
  );
};

ColorRow.propTypes = {
  colorValue: PropTypes.string,
  isActive: PropTypes.bool,
  onRowClick: PropTypes.func.isRequired,
};

export default ColorRow;
