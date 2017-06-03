//https://www.iconfinder.com/icons/762279/communication_connection_media_message_social_talk_weibo_icon#size=128
import React from 'react';
import styles from './style.less'
import {Input, Button, Card, Icon, Tooltip} from 'antd';

import img from './assets/icon2.png';
import imgo1 from './assets/oauth1.png';
import imgo2 from './assets/oauth2.png';
import imgo4 from './assets/oauth4.png';

const LoginCard = ({onLogin, goBack, wbClick, fbClick, ggClick}) => {
  return (
    <Card title="Welcome to ColorPK" style={{ width: 270 }}>
      <img onClick={goBack}
           src={img}
           className={styles.iconStyle}
        />
      <Input addonBefore={<Icon type="user" />} placeholder="Username" />
      <br/>
      <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
      <br/>
      <Button type="primary"
              onClick={onLogin}
              style={{width: '100%'}}>
        Login
      </Button>

      <br/>
      <div style={{float:'right', padding: '20px 0 20px 0'}}>
        <Tooltip title="Weibo">
          <img src={imgo1}
               onClick={wbClick}
               className={styles.oauthStyle}/>
        </Tooltip>
        <Tooltip title="Facebook">
          <img src={imgo2}
               onClick={fbClick}
               className={styles.oauthStyle}/>
        </Tooltip>
        <Tooltip title="Google+">
          <img src={imgo4}
               onClick={ggClick}
               className={styles.oauthStyle}/>
        </Tooltip>
      </div>
    </Card>
  );
};

export default LoginCard;
