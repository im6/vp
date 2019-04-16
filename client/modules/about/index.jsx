import React from 'react';
import { Row, Col, Card } from 'antd';
import style from './style.less';
import { ISMOBILE } from '../../config/global.js';

const boxStyle = {
  width: ISMOBILE ? "95%": 580,
  margin: ISMOBILE ? "0 auto" : "40px auto",
};

const About = () => (<Card
  style={boxStyle}
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

        <h3>
          I'd like to get you the best ColorPicker.
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
          - <a href="//www.javascript.fun/about/" target="_blank">ColorPK</a>
        </h3>
      </div>
    </Col>
  </Row>
</Card>);

export default About;