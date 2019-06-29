import React from 'react';
import style from './style.sass';

class ColorRow extends React.Component {
  clickHandler() {
    this.props.onRowClick();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isSame =
      nextProps.colorValue == this.props.colorValue &&
      nextProps.isActive == this.props.isActive;
    return !isSame;
  }

  render() {
    const rowStyle =
      this.props.colorValue && this.props.colorValue != '#'
        ? {
            backgroundColor: this.props.colorValue,
          }
        : {
            border: `1px solid ${this.props.isActive ? '#1a4cb6' : '#cccccc'}`,
            backgroundImage:
              "url('data:image/png;base64,R0lGODdhCgAKAPAAAOXl5f///ywAAAAACgAKAEACEIQdqXt9GxyETrI279OIgwIAOw==')",
          };

    return (
      <div
        className={style.rowContainer}
        style={rowStyle}
        onClick={this.props.onRowClick}
      ></div>
    );
  }
}

export default ColorRow;
