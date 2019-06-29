import React from 'react';
import style from './style.sass';

class ColorBar extends React.PureComponent {
  render() {
    return (
      <div>
        {this.props.value.split('#').map((v, k) => (
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

export default ColorBar;
