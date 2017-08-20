import React from 'react';
import { Row, Col, Card } from 'antd';
import style from './style.less';
import { mobileDetect } from '../../misc/util.js';
import { Global } from '../../config/global.js';

const { ISMOBILE } = Global;

const About = () => (<Card
  style={{ width: ISMOBILE ? "95%": 600 }}
  className={style.container}>
  <Row>
    <Col
      xs={24}
      sm={24}
      md={8}
      lg={8}>
      <div className={style.img}>
        <img src="http://dkny.oss-cn-hangzhou.aliyuncs.com/2/icon.png" />
      </div>
    </Col>

    <Col
      xs={24}
      sm={24}
      md={16}
      lg={16}>
      <div className={style.text}>
        {
          ISMOBILE? <div>
            <br/>
            <br/>
            <br/>
          </div> : null
        }

        <h2>
          I'd like to get you the best ColorPicKer.
          <br/>
          So I create ColorPK, Welcome!
          <br/>
          Feel free to fiddle out whatever palette in your mind,
          <br/>
          and share with others.
          <br/>
          It is a Social Platform after all :)
          <br/>
          <br/>
          - ColorPK
        </h2>
      </div>
    </Col>
  </Row>
</Card>);

export default About;