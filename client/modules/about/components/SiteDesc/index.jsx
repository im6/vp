import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import QueueAnim from 'rc-queue-anim';
import { Global } from '../../../../config/global.js';

import style from './style.less';

class SiteDesc extends React.PureComponent {
  constructor(props) {
    super(props);
    let me = this;
  }

  render() {
    const me = this;

    return <div className={style.container}>
      <QueueAnim
        delay={500}
        type={'bottom'}
        ease={['easeOutQuart', 'easeInOutQuart']}
        className={style.container}>

        <div key="a1" className={style.subBoxWidth}>
          <h2>
            Hi, Welcome to ColorPK.com
          </h2>
        </div>

        <div key="a3" className={style.subBoxWidth}>
          <h2>
            We build this site sincerely for the people who LOVE colors.
          </h2>
        </div>
        <div key="a4" className={style.subBoxWidth}>
          <h2>
            Feel free to fiddle out whatever palette in your mind,
          </h2>
        </div>
        <div key="a5" className={style.subBoxWidth}>
          <h2>
            and share with others.
          </h2>
        </div>
        <div key="a6" className={style.subBoxWidth}>
          <h2>
            It is a SOCIAL PLATFORM after all :)
          </h2>
        </div>

        <div key="a7" className={style.subBoxWidth}>
          <h2>

            <br/>
            - Zijian Guo
          </h2>
        </div>
      </QueueAnim>
    </div>
  }
}

export default SiteDesc;