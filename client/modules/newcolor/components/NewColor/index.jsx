import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Input, Checkbox, Icon, Select, message, Modal } from 'antd';
import EditCanvas from '../EditCanvas';
import FinishModal from '../FinishModal';
import style from './style.less';

const DEFAULTVALUE = '#',
  Option = Select.Option;

class NewColor extends React.PureComponent {
  constructor(props) {
    super(props);
    const me = this;
    me.state = {
      editColor: DEFAULTVALUE,
      activeIndex : 0,
      colorValue: [
        null,
        null,
        null,
        null
      ],
      showUpload: false,
      pickerWd: 200,
    };
  }

  showModal(){
    const me = this;
    Modal.success({
      title: 'Thank you for new colors',
      okText: 'Got it',
      content: <FinishModal isAuth={me.props.isAuth} />,
      onOk: (close) => {
        close();
        me.props.onRedirect();
      }
    });
  }

  submitColor(){
    const me = this;
    let good = true;
    me.state.colorValue.forEach(v => {
      if(!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v)) {
        good = false;
      }
    });
    if(good){
      me.props.onAdd(me.state.colorValue);
      me.showModal();
    }else{
      message.error('Invalid color.');
    }
  }

  onPickColor(color){
    const me = this;
    let oper = me.state.colorValue;
    oper[me.state.activeIndex] = color;
    me.setState({
      colorValue: oper,
      editColor: color
    });
  }

  onInputChange(ev){
    const me = this;
    let inputVal = ev.target.value;
    me.onPickColor('#' + inputVal);
  }

  onChangeActive(v){
    const me = this;
    debugger;
    let newCol = me.state.colorValue[v] || DEFAULTVALUE;
    me.setState({
      activeIndex: v,
      editColor:newCol
    });
  }

  onChkboxChange(ev){
    const me = this;
    me.setState({
      showUpload: ev.target.checked
    })

  }

  extractResult(data){
    const me = this;
    me.setState({
      colorValue: data
    });
  }

  resetColor(){
    const me = this;
    me.setState({
      colorValue: [
        null,
        null,
        null,
        null
      ]
    });
  }

  render() {
    const me = this;

    return <Card
      style={{width: '96%', 'margin':'0 auto'}}
      title={<span><Icon type="edit" />&nbsp;&nbsp;Create New Color</span>}
      >

      <Row>
        <Col lg={3} md={1} sm={0} xs={0}></Col>
        <Col lg={9} md={11} sm={24} xs={24}>
          

          <br/>

          <Input placeholder="hex"
                 addonBefore="#"
                 style={{'width': '77%'}}
                 size="large"
                 value={me.state.editColor.substring(1)}
                 onChange={me.onInputChange.bind(me)}/>
          <br/>
        </Col>

        <Col lg={1} md={1} sm={0} xs={0} />
        <Col lg={8} md={10} sm={24} xs={24} className={style.makeCenter}>
          <EditCanvas colorValue={me.state.colorValue}
                      activeIndex={me.state.activeIndex}
                      changeActive={me.onChangeActive.bind(me)}/>

          <div style={{margin: '10px 0 5px 0'}}>
            <Checkbox onChange={me.onChkboxChange.bind(me)}>
              <h3 style={{display: 'inline-block'}}>
                {me.state.showUpload ? 'Reset': 'Extract Image'}
              </h3>
            </Checkbox>
          </div>

        </Col>
        <Col lg={3} md={1} sm={0} xs={0} />
      </Row>



      <Row>
        <Col lg={24} md={24} sm={24} xs={24}>
          <div className={style.btnGroup}>

            <Button type="primary"
                    size="large"
                    icon="check"
                    onClick={me.submitColor.bind(me)}>
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
            &nbsp;&nbsp;&nbsp;
            <Button
              type="default"
              size="large"
              icon="reload"
              onClick={me.resetColor.bind(me)}
              />

          </div>
        </Col>
      </Row>
    </Card>
  }
}

export default NewColor;