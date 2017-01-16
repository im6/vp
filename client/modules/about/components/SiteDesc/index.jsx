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
      <div className={style.container}>
        <h2>
          I'd like to get you the BEST ColorPicKer,
          <br/>
          so here is ColorPK.com. Welcome!
          <br/>
          (No Player Killing stuff at all)
          <br/>
          The site is designed sincerely for people who LOVE colors.
          <br/>
          Feel free to fiddle out whatever palette in your mind,
          <br/>
          and share with others.
          <br/>
          It is a SOCIAL PLATFORM after all :)

          <br/><br/>
          - <a href={Global.zjweb} target="_blank">Zijian Guo</a>, New York City.
        </h2>
      </div>
    </div>
  }
}

export default SiteDesc;