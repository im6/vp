import React, { PropTypes } from 'react';
import { SketchPicker } from 'react-color';
import { Row, Col, Card, Button } from 'antd';
import EditCanvas from './components/EditCanvas';
import style from './style.less';


class NewColor extends React.Component {
  constructor(props) {
    super(props);
    let me = this;
    me.state = {
      editColor: '#000',
      activeIndex : 0,
      colorValue: [
        null,
        null,
        null,
        null
      ]
    };
  }

  onPickColor(color){
    let me = this;
    let oper = me.state.colorValue;
    oper[me.state.activeIndex] = color.hex;
    me.setState({
      colorValue: oper
    });
  }

  onChangeActive(v){
    let me = this;
    me.setState({
      activeIndex: v,
      editColor:me.state.colorValue[v] || '#000'
    });
  }

  render() {
    const me = this;
    return <Card title={<span><i className="fa fa-pencil-square-o" aria-hidden="true"/>&nbsp;&nbsp;Create New Colors</span>}>

      <Row>


        <Col lg={4} md={3} sm={0} xs={0}></Col>

        <Col lg={8} md={11} sm={24} xs={24} className={style.makeCenter}>
          <EditCanvas colorValue={me.state.colorValue}
                      activeIndex={me.state.activeIndex}
                      changeActive={me.onChangeActive.bind(me)}/>
        </Col>
        <Col lg={3} md={2} sm={0} xs={0}></Col>
        <Col lg={5} md={5} sm={24} xs={24}>
          <div>
            <SketchPicker color={ me.state.editColor }
                          onChange={ me.onPickColor.bind(me) }/>
          </div>
          <br/>
          <div className={style.btnGroup}>
            <Button type="default" size="large">
              Cancel
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary" size="large">
              Create
            </Button>
          </div>
        </Col>

        <Col lg={4} md={3} sm={0} xs={0}>

        </Col>
      </Row>
    </Card>
  }

}
export default NewColor;