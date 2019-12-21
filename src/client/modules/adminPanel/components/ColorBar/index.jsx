import React from 'react';
import style from './style.sass';
import PropTypes from 'prop-types';

class ColorBar extends React.PureComponent {
  render() {
    const { value } = this.props;
    return (
      <div>
        {value.split('#').map((v, k) => (
          <div
            key={k}
            className={style.oneBar}
            style={{ backgroundColor: '#' + v }}
          />
        ))}
      </div>
    );
  }
}

ColorBar.propTypes = {
  value: PropTypes.string.isRequired,
};

export default ColorBar;
