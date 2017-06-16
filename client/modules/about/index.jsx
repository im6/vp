import React from 'react';
import { Row, Col, Card } from 'antd';
import { connect } from 'react-redux';
import style from './style.less';
import SiteDesc from './components/SiteDesc';
//import SiteTimeline from './components/SiteTimeline';
import Polygons from './components/Polygons';

const About = ({ isMobile }) => (<Card
  style={{ width: isMobile ? "100%": "95%" }}
  className={style.container}>
  <Row>
    <Col
      xs={0}
      sm={1}
      md={2}
      lg={3}/>
    <Col
      xs={24}
      sm={11}
      md={10}
      lg={9}>
      <Polygons />
    </Col>
    <Col
      xs={24}
      sm={11}
      md={10}
      lg={9}>
      <SiteDesc />
    </Col>
    <Col
      xs={0}
      sm={1}
      md={2}
      lg={3}/>
  </Row>
</Card>);

const mapStateToProps = ({ user }) => {
  return {
    isMobile: user.get('isMobile'),
  }
};

export default connect(mapStateToProps)(About);