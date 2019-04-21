import React from 'react';
import style from './style.sass';

class ColorBar extends React.PureComponent {
  render() {
    const me = this;
    let v0 = me.props.value;
    let v1 = v0.split('#');
    return <div>
      {
        v1.map((v, k) => <div key={k}
          className={style.oneBar}
          style={{backgroundColor: '#'+v}} />)
      }
    </div>
  }
}

export default ColorBar;