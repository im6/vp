import React from 'react';
import PropTypes from 'prop-types';
import style from './style.sass';

class ColorRow extends React.Component {
  shouldComponentUpdate(nextProps) {
    const isSame =
      nextProps.colorValue == this.props.colorValue &&
      nextProps.isActive == this.props.isActive;
    return !isSame;
  }

  render() {
    const { onRowClick, colorValue, isActive } = this.props;
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
      <div
        className={style.rowContainer}
        style={rowStyle}
        onClick={onRowClick}
      />
    );
  }
}

ColorRow.propTypes = {
  onRowClick: PropTypes.func.isRequired,
  colorValue: PropTypes.string,
  isActive: PropTypes.bool,
};

export default ColorRow;
