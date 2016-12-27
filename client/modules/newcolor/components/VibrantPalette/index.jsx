import React from 'react';
import { Button, Icon, message, Checkbox } from 'antd';
import classnames from 'classnames';
import Vibrant from 'node-vibrant';
import style from './style.less';


class VibrantPalette extends React.Component {
  constructor(props) {
    super(props);
    let me = this;
    me.state = {
      imageUrl: null,
      imageReady: false,
      imageResult: [],
      isFileHover: false
    };
  }

  componentDidMount() {
    let me = this;
  }

  componentWillUnmount() {
  }

  clickHandler(ev){
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
    console.log('enter');
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
    console.log('leave');
    me.setState({
      isFileHover: false
    });
  }

  onDropHandler(ev){
    let me = this;
    ev.stopPropagation();
    ev.preventDefault();
    let files = ev.dataTransfer.files;
    me.readImage(files);
  }

  fileInputOnChange(ev){
    let me = this;
    let files = ev.target.files;
    me.readImage(files);
  }

  onResultChkboxClick(ev){
    let me = this;
  }

  readImage(files){
    let me = this;
    if (files && files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        let {uploadBox} = me.refs;
        me.setState({
          imageUrl: e.target.result,
          imageReady: true
        });
        me.process();
      };

      reader.readAsDataURL(files[0]);
    } else{
      message.error('Oops! Image reads error!');
    }

  }

  process(){
    let me = this;

    Vibrant.from(me.state.imageUrl).getPalette(function(err, palette){

      if(err){
        message.error('Oops! Error in color extraction from image.');
      }else{
        let result = [];

        result.push(palette.Muted.getHex());
        result.push(palette.DarkMuted.getHex());
        result.push(palette.LightMuted.getHex());
        result.push(palette.Vibrant.getHex());
        result.push(palette.DarkVibrant.getHex());
        result.push(palette.LightVibrant.getHex());
        me.setState({
          imageResult: result
        });
        me.props.onResult(result);
      }

    });
  }


  render() {
    let me = this;

    let hoverStyle = {};
    hoverStyle[style.hoverEffect]= me.state.isFileHover;

    return <div className={style.container}>
      <input type="file"
             ref="fileInput"
             onChange={me.fileInputOnChange.bind(me)}
             style={{display:'none'}}/>

        {me.state.imageReady ? <div className={style.previewContainer}>
          <img src={me.state.imageUrl} alt="uploaded file"/>
          <div className={style.previewResult}>
            <div>
              {
                me.state.imageResult.map((v,k) => {
                  return (<Checkbox key={k} onChange={me.onResultChkboxClick.bind(me)}>
                    <div className={style.resultBox} style={{backgroundColor: v}}/>
                  </Checkbox>);
                })
              }
            </div>

          </div>
        </div> :
          <div className={classnames(style.upload, hoverStyle)}
               ref="uploadBox"
               onDragEnter={me.onDragEnterHandler.bind(me)}
               onDragOver={me.onDragOverHandler.bind(me)}
               onDragLeave={me.onDragLeaveHandler.bind(me)}
               onDrop={me.onDropHandler.bind(me)}
               onClick={me.clickHandler.bind(me)}>

            <Icon type="inbox" className={style.uploadIcon}/>
            <h2>
              Click or drag file to this area to upload
            </h2>
          </div>
        }

    </div>
  }
}

export default VibrantPalette;