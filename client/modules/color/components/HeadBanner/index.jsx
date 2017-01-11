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
  }

  return ele;
};

export default HeadBanner;