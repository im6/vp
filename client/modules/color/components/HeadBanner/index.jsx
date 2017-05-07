import React from 'react';
import { Link } from 'react-router';
import { Alert, Button } from 'antd';
import style from './style.less';

const HeadBanner = ({colorSize, colorType}) => {
  let ele = null;
  if(colorType === 'like' && colorSize === 0){
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
  } else if(colorType === 'portfolio' && colorSize === 0){
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
  } else if(true){
    //todo:


  } else {
    ele = <Alert
      message={<h3>Recognized by community</h3>}
      description={
      <h3>
        <br/>
        ColorPK is selected by &nbsp;
        <a href="http://www.javascript.fun/site" target="_blank">
        JavaScript.Fun
        </a>&nbsp;
        as a recommendated colorpicker website.&nbsp;
        We will keep delivering our users innovative and adaptive color solutions.
        <br/>
        Way to go &nbsp; :)
      </h3>
      }
      type="success"
      showIcon
      closable
      />
  }

  return <div className={style.wrapper}>
    {ele}
  </div>;
};

export default HeadBanner;