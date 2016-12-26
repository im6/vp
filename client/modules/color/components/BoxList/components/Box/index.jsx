import React from 'react';
import { Button, Icon } from 'antd';
import classnames from 'classnames';
import style from './style.less';
import ColorRow from './components/ColorRow';
import Immutable from 'immutable';



class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }

  shouldComponentUpdate(nextProps, nextState){
    let me = this;
    return !Immutable.is(me.props.boxInfo, nextProps.boxInfo);
  }

  render() {
    let me = this;

    return <div className={style.box}>
        <div className={style.boxCanvas}>
          {me.props.boxInfo.get('value').split(',').map((v, k) => {
            return <ColorRow key={k} rowColor={v} />
          })}
        </div>

        <div className={style.boxFooter}>
          <Button type="default">
            <h3 style={{display: 'inline'}}>
              <Icon type="heart" style={{color: '#e86666'}}/>
              &nbsp;&nbsp;
              {me.props.boxInfo.get('like')}
            </h3>
          </Button>
          <img src="http://tva4.sinaimg.cn/crop.0.0.180.180.50/4a377f76jw1e8qgp5bmzyj2050050aa8.jpg" alt="icon"/>


        </div>
    </div>;
  }
}

export default Product;