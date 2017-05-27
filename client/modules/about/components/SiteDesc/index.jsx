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
      <h2>
        We'd like to get you the best ColorPicKer.
        <br/>
        So I create ColorPK, Welcome!
        <br/>
        Feel free to fiddle out whatever palette in your mind,
        <br/>
        and share with others.
        <br/>
        It is a Social Platform after all :)

        <br/><br/>
        - ColorPK team @Jan,2017
      </h2>
    </div>
  }
}

export default SiteDesc;