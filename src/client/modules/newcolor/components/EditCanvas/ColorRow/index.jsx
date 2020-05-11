import React, { memo } from 'react';
import PropTypes from 'prop-types';
import style from './style.sass';

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

const isEqual = (prevProps, nextProps) => {
  const isSame =
    nextProps.colorValue == prevProps.colorValue &&
    nextProps.isActive == prevProps.isActive;
  return isSame;
};

export default memo(ColorRow, isEqual);
