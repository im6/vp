import React from 'react';
import { Link } from 'react-router';
import { Alert, Button } from 'antd';
import style from './style.less';
import Global from '../../../../config/global.js';

const { BNNRPADDING } = Global;

const HeadBanner = ({colorSize, colorView}) => {
  let ele = null;
  if(colorView === 'like' && colorSize === 0){
    ele = <div>
      <Alert
        message="You have no favorite colors yet."
        description="You can save the colors by clicking Like button."
        type="warning"
        showIcon
        />
      <Link to="/">
        <Button type="default" icon="home">
          &nbsp;&nbsp;Go to popular
        </Button>
      </Link>
    </div>;
  } else if(colorView === 'portfolio' && colorSize === 0){
    ele = <div>
      <Alert
        message="You haven't create any colors yet."
        description="Try to create something fancy."
        type="warning"
        showIcon
        />
      <Link to="/new">
        <Button type="default" icon="plus">
          &nbsp;&nbsp;New Color
        </Button>
      </Link>
    </div>;
  } else if(colorView === 'color'){
    // do nothing;
  } else {
    ele = <Alert
      message={
      <div>
        ColorPK is selected by &nbsp;
        <a href="http://www.javascript.fun" target="_blank">
          JavaScript.Fun
        </a>&nbsp;
        as a recommendated colorpicker website.
      </div>
      }
      type="info"
      showIcon
      closable
      />
  }

  return <div className={style.wrapper} style={{padding: `0 ${BNNRPADDING}px`}}>
    <Alert
      message={
      <div>
        A &nbsp;
        <a href="http://www.colorpk.com" target="_blank">
          New version
        </a>&nbsp;
        of ColorPK just release!
      </div>
      }
      type="success"
      showIcon
      closable
    />
    {ele}
  </div>;
};

export default HeadBanner;