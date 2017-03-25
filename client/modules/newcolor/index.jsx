import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createAction } from 'redux-actions';
import ColorPicker from 'react-color-picker';
import { browserHistory } from 'react-router';
import { Row, Col, Card, Button, Input, Checkbox, Icon, Select, message, Modal, Tooltip } from 'antd';

import EditCanvas from './components/EditCanvas';
import VibrantPalette from './components/VibrantPalette';
import FinishModal from './components/FinishModal';

const Option = Select.Option;

import '!style!css!less!autoprefixer-loader?browsers=last 2 versions!react-color-picker/index.css';
import style from './style.less';

const DEFAULTVALUE = '#adeef9';

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
      showUpload: me.props.routePath === '/extract',
      colorType: [],
      pickerWd: 200,
    };
  }

  componentDidMount(){
    let me = this;
    let { cpbox } = me.refs;
    me.setState({
      pickerWd: cpbox.offsetWidth
    });
  }

  showModal(){
    let me = this;
    let isAuth = me.props.user.get('isAuth');
    Modal.success({
      title: 'Thank you for new colors',
      okText: 'Got it',
      content: <FinishModal isAuth={isAuth} />,
      onOk: (close) => {
        close();
        browserHistory.push('/');
      }
    });
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
      let cl0 = me.state.colorValue.map(v =>{
        return v.substr(1);
      });
      let cl1 = cl0.join('#');
      const ac = createAction('color/addNew');
      me.props.dispatch(ac({
        color : cl1,
        colorType: me.state.colorType.join(',')
      }));
      me.showModal();
    }else{
      message.error('Invalid color.');
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

  onColorTypeChange(ev){
    let me = this;
    me.setState({
      colorType: ev
    });
  }

  extractResult(data){
    let me = this;
    me.setState({
      colorValue: data
    });
  }

  resetColor(){
    let me = this;
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
    let types = me.props.colorType.get('list').toJS();

    return <Card
      style={{width: '96%', 'margin':'0 auto'}}
      title={<span><Icon type="edit" />&nbsp;&nbsp;Create New Color</span>}
      >

      <Row>
        <Col lg={24} md={24} sm={24} xs={24} style={{marginBottom: 30, display: 'flex', justifyContent:'center'}}>
          <div style={{width: '80%'}}>
            <label> Color Type: &nbsp;&nbsp;&nbsp;&nbsp;</label>
            <Select
              multiple
              style={{ width: '67%' }}
              placeholder="Please select type"
              value={me.state.colorType}
              onChange={me.onColorTypeChange.bind(me)}
              >
              {
                types.map((v,k) => {
                  return <Option key={k}>{v.value}</Option>
                })
              }
            </Select>
          </div>

        </Col>

        <Col lg={3} md={1} sm={0} xs={0}></Col>
        <Col lg={9} md={11} sm={24} xs={24}>
          <div ref="cpbox">
            <ColorPicker hueWidth={me.state.pickerWd * 0.15}
                         saturationWidth={me.state.pickerWd * 0.78}
                         value={me.state.editColor}
                         onDrag={me.onPickColor.bind(me)}/>
          </div>

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

          {me.state.showUpload ? <VibrantPalette onResult={me.extractResult.bind(me)}/> : null}

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
            <Tooltip placement="top" title="Reset">
              <Button type="default"
                      size="large"
                      icon="reload"
                      onClick={me.resetColor.bind(me)} />
            </Tooltip>

          </div>
        </Col>
      </Row>
    </Card>
  }
}

function mapStateToProps({colorType, user, routing}){
  let routePath = routing.locationBeforeTransitions.pathname;
  return {
    routePath,
    colorType,
    user
  }
}

export default connect(mapStateToProps)(NewColor);