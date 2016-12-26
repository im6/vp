import React from 'react';
import { Button, Icon, message } from 'antd';
import classnames from 'classnames';
import style from './style.less';


class VibrantPalette extends React.Component {
  constructor(props) {
    super(props);
    let me = this;
    me.state = {
      imageUrl: null
    };

  }

  componentDidMount() {
    let me = this;
  }

  componentWillUnmount() {
  }

  clickHandler(ev){
    let me = this;
    ev.stopPropagation();
    let {fileInput} = me.refs;
    fileInput.click();
    console.log('fired..');

  }

  render() {
    let me = this;
    const imageUrl = me.state.imageUrl;

    return <div className={style.container}>

      <div className={style.upload} onClick={me.clickHandler.bind(me)}>
        <input type="file" ref="fileInput"/>
        <Icon type="inbox" className={style.uploadIcon}/>
        <h1>
          Click or drag file to this area to upload
        </h1>
      </div>

    </div>
  }
}

export default VibrantPalette;