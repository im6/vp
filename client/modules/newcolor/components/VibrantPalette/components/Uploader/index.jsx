import React from 'react';
import { Icon, notification } from 'antd';
import classnames from 'classnames';
import style from './style.less';


class Uploader extends React.Component {
  constructor(props) {
    super(props);
    let me = this;
    me.state = {
      isFileHover: false
    };
  }

  componentDidMount() {
    let me = this;
  }

  componentWillUnmount() {
  }

  onClickHandler(ev){
    ev.stopPropagation();
    let me = this;
    let {fileInput} = me.refs;
    fileInput.click();
  }

  onDragEnterHandler(ev){
    let me = this;
    ev.stopPropagation();
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "copy";
    me.setState({
      isFileHover: true
    });
  }

  onDragOverHandler(ev){
    let me = this;
    ev.stopPropagation();
    ev.preventDefault();
  }

  onDragLeaveHandler(ev){
    let me = this;
    me.setState({
      isFileHover: false
    });
  }

  onDropHandler(ev){
    let me = this;
    ev.stopPropagation();
    ev.preventDefault();
    let files = ev.dataTransfer.files;
    me.exportFiles(files);
  }

  fileInputOnChange(ev){
    let me = this;
    let files = ev.target.files;
    me.exportFiles(files);
  }

  exportFiles(files){
    let me = this;
    if (files && files[0]) {
      me.props.uploadComplete(files);
    } else{
      notification.error({
        message: 'Oops!',
        description: 'Upload Image failed.Please try again.',
      });
    }
  }

  render() {
    let me = this;

    let hoverStyle = {};
    hoverStyle[style.hoverEffect]= me.state.isFileHover;

    return <div style={{width: '100%'}}>
      <input type="file"
             ref="fileInput"
             onChange={me.fileInputOnChange.bind(me)}
             style={{display:'none'}}/>
      <div className={classnames(style.upload, hoverStyle)}
           ref="uploadBox"
           onDragEnter={me.onDragEnterHandler.bind(me)}
           onDragOver={me.onDragOverHandler.bind(me)}
           onDragLeave={me.onDragLeaveHandler.bind(me)}
           onDrop={me.onDropHandler.bind(me)}
           onClick={me.onClickHandler.bind(me)}>

        <Icon type="inbox" className={style.uploadIcon}/>
        <h2>
          Click or drag file to this area to upload
        </h2>
      </div>
    </div>
  }
}

export default Uploader;