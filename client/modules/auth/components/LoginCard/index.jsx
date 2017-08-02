//https://www.iconfinder.com/icons/762279/communication_connection_media_message_social_talk_weibo_icon#size=128
import React from 'react';
import styles from './style.less'
import {Input, Button, Card, Icon, Tooltip} from 'antd';

const LoginCard = ({onLogin, goBack, wbClick, fbClick, ggClick}) => {
  return (
    <Card style={{ width: 270, borderRadius: 9 }}>
      <img onClick={goBack}
           src="http://dkny.oss-cn-hangzhou.aliyuncs.com/2/icon.png"
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
          <img src="http://dkny.oss-cn-hangzhou.aliyuncs.com/2/oauth1.png"
               onClick={wbClick}
               className={styles.oauthStyle}/>
        </Tooltip>
        <Tooltip title="Facebook">
          <img src="http://dkny.oss-cn-hangzhou.aliyuncs.com/2/oauth2.png"
               onClick={fbClick}
               className={styles.oauthStyle}/>
        </Tooltip>
        <Tooltip title="Google+">
          <img src="http://dkny.oss-cn-hangzhou.aliyuncs.com/2/oauth4.png"
               onClick={ggClick}
               className={styles.oauthStyle}/>
        </Tooltip>
      </div>
    </Card>
  );
};

export default LoginCard;
