import React from 'react';
import { Button } from 'antd';
import classnames from 'classnames';
import style from './style.less';
import ColorRow from './components/ColorRow';

const test = [
  {value: '#F38181'},
  {value: '#FCE38A'},
  {value: '#EAFFD0'},
  {value: '#95E1D3'}
];

class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }

  render() {
    return <div className={style.box}>
        <div className={style.boxCanvas}>
          {test.map((v, k) => {
            return <ColorRow key={k} rowColor={v.value} />
          })}
        </div>

        <div className={style.boxFooter}>
          <Button type="default" icon="like-o">
            1,258
          </Button>
          <Button type="default" >
            <i className="fa fa-weibo" />
          </Button>
        </div>
    </div>;
  }
}

export default Product;