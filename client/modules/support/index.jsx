import React, { PropTypes } from 'react';
import { Table, Icon, Card, Button } from 'antd';
import styles from './style.less';
import QueueAnim from 'rc-queue-anim';
import classnames from 'classnames';
import img from '!file!./assets/support.png';

class Support extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return <Card title="Support Center" bordered={true} style={{height: 650}}>
      <QueueAnim delay={300}>
        <div key="a1" className={classnames(styles.center, styles.logo)}>
          <img src={img} />
        </div>
        <h1 key="a2" className={classnames(styles.center, styles.title1)}>
          We are here to help
        </h1>

        <div key="a4" className={classnames(styles.center, styles.button1)}>
          <Button type="primary" size="large">
            <i className="fa fa-pencil-square-o"/>
            Leave a message
          </Button>
        </div>

      </QueueAnim>
    </Card>;
  }
}


export default Support;