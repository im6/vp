import React from 'react';
import { Row, Col, Card } from 'antd';
import { connect } from 'react-redux';
import style from './style.less';
import img from '../auth/components/LoginCard/assets/icon2.png';

const About = ({isMobile}) => (<Card
  style={{ width: isMobile ? "95%": 600 }}
  className={style.container}>
  <Row>
    <Col
      xs={24}
      sm={24}
      md={8}
      lg={8}>
      <div className={style.img}>
        <img src={img}/>
      </div>
    </Col>

    <Col
      xs={24}
      sm={24}
      md={16}
      lg={16}>
      <div className={style.text}>
        {
          isMobile? <div>
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

const mapStateToProps = ({ user }) => {
  return {
    isMobile: user.get('isMobile'),
  }
};

export default connect(mapStateToProps)(About);