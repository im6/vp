import React, { PropTypes } from 'react';
import { Card } from 'antd';
import style from './style.less';

const Footer = () =><footer className={style.footerContainer}>
  <div className={style.footerText}>
    <div className={style.frostedGlass}></div>
    <h3>Built with react, react-router, redux, redux-thunk, ant-design, by ZJ Guo</h3>
  </div>
</footer>

export default Footer;
