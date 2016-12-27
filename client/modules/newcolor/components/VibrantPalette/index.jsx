import React from 'react';
import { Button, Icon, message, Checkbox } from 'antd';
import classnames from 'classnames';
import Vibrant from 'node-vibrant';
import style from './style.less';

const CheckboxGroup = Checkbox.Group;


class VibrantPalette extends React.Component {
  constructor(props) {
    super(props);
    let me = this;
    me.state = {
      imageUrl: null,
      imageReady: false,
      imageResult: [],
      imageResultSelection: [],
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
    me.readImage(files);
  }

  fileInputOnChange(ev){
    let me = this;
    let files = ev.target.files;
    me.readImage(files);
  }

  onResultChkboxClick(cl, ev){
    let me = this;
    let isChecked = ev.target.checked;
    let current = me.state.imageResultSelection;

    if(isChecked){
      let newList = null;
      if(current.length == 4){
        let removeIndex = Math.floor(Math.random() * current.length);
        let current3 = current.filter((v,k) => {
          return k != removeIndex;
        });
        newList = [...current3, cl];
      }else{
        newList = [...current, cl]
      }
      me.setState({
        imageResultSelection: newList
      });
      if(newList.length == 4){
        me.props.onResult(newList);
      }
    }else{
      let newList = current.filter((v,k) => {
        return v != cl;
      });
      me.setState({
        imageResultSelection: newList
      });
    }

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

        let currentSelection = [
          palette.Muted.getHex(),
          palette.DarkMuted.getHex(),
          palette.LightMuted.getHex(),
          palette.Vibrant.getHex()
        ];
        me.setState({
          imageResult: result,
          imageResultSelection: currentSelection
        });
        me.props.onResult(currentSelection);
      }

    });
  }


  render() {
    let me = this;

    let hoverStyle = {};
    hoverStyle[style.hoverEffect]= me.state.isFileHover;

    return <div className={style.container}>

        {me.state.imageReady ? <div className={style.previewContainer}>

          <div className={style.previewResult}>
            {
              me.state.imageResult.map((v,k) => {
                return (<Checkbox key={k} checked={me.state.imageResultSelection.indexOf(v) > -1} onChange={me.onResultChkboxClick.bind(me, v)}>
                  <div className={style.resultBox} style={{backgroundColor: v}}/>
                </Checkbox>);
              })
            }
          </div>
          <img src={me.state.imageUrl} alt="uploaded file"/>
        </div> :
          <div style={{width: '100%'}}>
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

    </div>
  }
}

export default VibrantPalette;