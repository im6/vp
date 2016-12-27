import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import ColorPicker from 'react-color-picker';
import { Row, Col, Card, Button, Input, Checkbox, Icon } from 'antd';
import EditCanvas from './components/EditCanvas';
import VibrantPalette from './components/VibrantPalette';

import '!style!css!less!autoprefixer-loader?browsers=last 2 versions!react-color-picker/index.css';
import style from './style.less';

const DEFAULTVALUE = '#f9e8ad';

class NewColor extends React.PureComponent {
  constructor(props) {
    super(props);
    let me = this;
    me.state = {
      editColor: DEFAULTVALUE,
      activeIndex : 0,
      colorValue: [
        null,
        null,
        null,
        null
      ],
      showUpload: true
    };
  }

  submitColor(){
    let me = this;
    let good = true;
    me.state.colorValue.forEach(v => {
      if(!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v)) {
        good = false;
      }
    });
    if(good){
      alert('color Good');
    }else{
      alert('color not ready');
    }
  }

  onPickColor(color){
    let me = this;
    let oper = me.state.colorValue;
    oper[me.state.activeIndex] = color;
    me.setState({
      colorValue: oper,
      editColor: color
    });
  }

  onInputChange(ev){
    let me = this;
    let inputVal = ev.target.value;
    me.onPickColor('#' + inputVal);
  }

  onChangeActive(v){
    let me = this;
    let newCol = me.state.colorValue[v] || DEFAULTVALUE;
    me.setState({
      activeIndex: v,
      editColor:newCol
    });
  }

  onChkboxChange(ev){
    let me = this;
    me.setState({
      showUpload: ev.target.checked
    })

  }

  extractResult(data){
    let me = this;
    me.setState({
      colorValue: data
    });
  }

  render() {
    const me = this;
    return <Card title={<span><i className="fa fa-pencil-square-o" aria-hidden="true"/>&nbsp;&nbsp;Create New Color</span>}>

      <Row>
        <Col lg={2} md={1} sm={0} xs={0}></Col>
        <Col lg={9} md={10} sm={24} xs={24} className={style.makeCenter}>
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

          {me.state.showUpload ? <VibrantPalette onResult={me.extractResult.bind(me)}/> : null}

        </Col>
        <Col lg={2} md={1} sm={0} xs={0}></Col>
        <Col lg={9} md={11} sm={24} xs={24}>
          <ColorPicker hueWidth={55}
                       value={me.state.editColor}
                       onDrag={me.onPickColor.bind(me)}/>
          <br/>

          <Input placeholder="hex"
                 addonBefore="#"
                 style={{'width': 276}}
                 size="large"
                 value={me.state.editColor.substring(1)}
                 onChange={me.onInputChange.bind(me)}/>
        </Col>
        <Col lg={2} md={1} sm={0} xs={0} />
      </Row>


      <Row>
        <Col lg={24} md={24} sm={24} xs={24}>
          <div className={style.btnGroup}>
            <Button type="primary"
                    size="large"
                    icon="check"
                    onClick={me.submitColor.bind(me)}>
              Create
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/">
              <Button type="default"
                      icon="close"
                      size="large">
                Cancel
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Card>
  }
}

export default NewColor;