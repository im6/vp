import React from 'react';
import style from './style.sass';
import ColorRow from './components/ColorRow';

class EditCanvas extends React.Component {
  render() {
    return (
      <div className={style.box}>
        <div className={style.boxCanvas}>
          {this.props.colorValue.map((v, k) => {
            return (
              <ColorRow
                key={k}
                colorValue={v}
                isActive={k === this.props.activeIndex}
                onRowClick={this.props.changeActive.bind(this, k)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default EditCanvas;
