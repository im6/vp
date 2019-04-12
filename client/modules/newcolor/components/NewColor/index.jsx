import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Icon, message, Modal } from 'antd';
import { ChromePicker } from 'react-color';
import EditCanvas from '../EditCanvas';
import FinishModal from '../FinishModal';
import style from './style.less';

const DEFAULTVALUE = '#81EEFF';

class NewColor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editColor: DEFAULTVALUE,
      activeIndex : 0,
      colorValue: [
        null,
        null,
        null,
        null
      ],
      pickerWd: 200,
    };
    this.onChangeActive = this.onChangeActive.bind(this);
    this.submitColor = this.submitColor.bind(this);
    this.resetColor = this.resetColor.bind(this);
    this.onPickColor = this.onPickColor.bind(this);
  }

  showModal(){
    Modal.success({
      title: 'Thank you for new colors',
      okText: 'Got it',
      content: <FinishModal isAuth={this.props.isAuth} />,
      onOk: (close) => {
        close();
        this.props.onRedirect();
      }
    });
  }

  submitColor(){
    let good = true;
    this.state.colorValue.forEach(v => {
      if(!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v)) {
        good = false;
      }
    });
    if(good){
      this.props.onAdd(this.state.colorValue);
      this.showModal();
    }else{
      message.error('Invalid color.');
    }
  }

  onPickColor({ hex }){
    const oper = this.state.colorValue;
    oper[this.state.activeIndex] = hex;
    this.setState({
      colorValue: oper,
      editColor: hex
    });
  }

  onChangeActive(activeIndex){
    const editColor = this.state.colorValue[activeIndex] || DEFAULTVALUE;
    this.setState({
      activeIndex,
      editColor
    });
  }

  extractResult(data){
    this.setState({
      colorValue: data
    });
  }

  resetColor(){
    this.setState({
      colorValue: [
        null,
        null,
        null,
        null
      ]
    });
  }

  render() {
    return <div className={style.container}>
      <Row>
        <Col span={17}>
          <ChromePicker
            color={ this.state.editColor }
            onChangeComplete={this.onPickColor}
          />
          <div style={{marginTop: 35}}>
            <Button type="primary"
                    size="large"
                    icon="check"
                    onClick={this.submitColor}>
              Submit
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Link to="/">
              <Button type="default"
                      icon="close"
                      size="large">
                Cancel
              </Button>
            </Link>
          </div>
        </Col>
        <Col span={7}>
          <EditCanvas colorValue={this.state.colorValue}
                      activeIndex={this.state.activeIndex}
                      changeActive={this.onChangeActive}
          />
          <div style={{marginTop: 30}}>
            <Button
              type="default"
              size="large"
              icon="reload"
              onClick={this.resetColor}
              style={{width: '100%'}}
            >Reset</Button>
          </div>
        </Col>
      </Row>

    </div>
  }
}

export default NewColor;