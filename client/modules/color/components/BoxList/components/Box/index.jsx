import React from 'react';
import { Button } from 'antd';
import classnames from 'classnames';
import style from './style.less';
import ColorRow from './components/ColorRow';



class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillUnmount() {
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
          <Button type="default" icon="heart-o">
            {me.props.boxInfo.get('like')}
          </Button>
          <Button type="default" >
            <i className="fa fa-weibo" />
          </Button>
        </div>
    </div>;
  }
}

export default Product;