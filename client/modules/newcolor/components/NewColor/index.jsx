import React from 'react';
import { ChromePicker } from 'react-color';
import EditCanvas from '../EditCanvas';
import style from './style.sass';

const DEFAULTVALUE = '#81EEFF';

class NewColor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editColor: DEFAULTVALUE,
      activeIndex: 0,
      colorValue: [null, null, null, null],
      pickerWd: 200,
    };
    this.onChangeActive = this.onChangeActive.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.resetColor = this.resetColor.bind(this);
    this.onPickColor = this.onPickColor.bind(this);
  }

  onSubmit() {
    let good = true;
    this.state.colorValue.forEach(v => {
      if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v)) {
        good = false;
      }
    });
    if (good) {
      this.props.onAdd([...this.state.colorValue]);
      this.resetColor();
      alert('Thank you for new colors');
    } else {
      console.error('Invalid color');
    }
  }

  onPickColor({ hex }) {
    const { colorValue } = this.state;
    colorValue[this.state.activeIndex] = hex;
    this.setState({
      colorValue,
      editColor: hex,
    });
  }

  onChangeActive(activeIndex) {
    const editColor = this.state.colorValue[activeIndex] || DEFAULTVALUE;
    this.setState({
      activeIndex,
      editColor,
    });
  }

  extractResult(data) {
    this.setState({
      colorValue: data,
    });
  }

  resetColor() {
    this.setState({
      colorValue: [null, null, null, null],
    });
  }

  render() {
    const { onRedirect } = this.props;
    return (
      <div className={style.container}>
        <div className={style.floor0}>
          <div>
            <ChromePicker
              color={this.state.editColor}
              onChangeComplete={this.onPickColor}
            />
          </div>
          <div>
            <EditCanvas
              colorValue={this.state.colorValue}
              activeIndex={this.state.activeIndex}
              changeActive={this.onChangeActive}
            />
          </div>
        </div>
        <div className={style.floor1}>
          <button className="button is-primary" onClick={this.onSubmit}>
            Submit
          </button>
          <button className="button" onClick={this.resetColor}>
            Reset
          </button>
          <button className="button is-info" onClick={onRedirect}>
            Return
          </button>
        </div>
      </div>
    );
  }
}

export default NewColor;
