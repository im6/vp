import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import QueueAnim from 'rc-queue-anim';
import { Global } from '../../../../config/global.js';

import style from './style.less';
import img from '!file!./assets/me.jpg';

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
          <h3>
            Hi, Welcome!
          </h3>
        </div>
        <div key="a2" className={style.subBoxWidth}>
          <h3>
            This is ColorPK.com.
          </h3>
        </div>
        <div key="a3" className={style.subBoxWidth}>
          <h3>
            We build this site sincerely for the people who LOVE colors.
          </h3>
        </div>
        <div key="a4" className={style.subBoxWidth}>
          <h3>
            Feel free to fiddle out whatever palette in your mind,
          </h3>
        </div>
        <div key="a5" className={style.subBoxWidth}>
          <h3>
            and share with others.
          </h3>
        </div>
        <div key="a6" className={style.subBoxWidth}>
          <h3>
            It is a SOCIAL PLATFORM after all :)
          </h3>
        </div>

        <div key="a7" className={style.subBoxWidth}>
          <h3>
            - Zijian Guo
          </h3>
        </div>

        <div key="b1" className={style.subBoxWidth}>
          <a href={Global.zjweb} target="_blank">
            <img src={img} alt=""/>
          </a>
        </div>

      </QueueAnim>
    </div>
  }
}

export default SiteDesc;