import React from 'react';
import { notification } from 'antd';
import classnames from 'classnames';
import Vibrant from 'node-vibrant';
import style from './style.less';

import ResultPreview from './components/ResultPreview';
import Uploader from './components/Uploader';


class VibrantPalette extends React.Component {
  constructor(props) {
    super(props);
    let me = this;
    me.state = {
      imageUrl: null,
      colorSelection: [],
      imageColors: [],
    };
  }

  componentDidMount() {
    let me = this;
  }

  componentWillUnmount() {
  }


  readImage(files){
    let me = this;
    var reader = new FileReader();
    reader.onload = function (e) {
      me.setState({
        imageUrl: e.target.result
      });
      me.process();
    };

    reader.readAsDataURL(files[0]);
  }
  previewOutputHandler(cls){
    let me = this;
    me.setState({
      colorSelection: cls
    });

    if(cls.length === 4){
      me.props.onResult(cls);
    }
  }

  process(){
    let me = this;

    Vibrant.from(me.state.imageUrl).getPalette(function(err, palette){

      if(err){
        notification.error({
          message: 'Oops',
          description: 'Image analysis failed, please check your image format',
        });
      }else{
        let result = [];

        result.push(palette.Muted.getHex());
        result.push(palette.DarkMuted.getHex());
        result.push(palette.LightMuted.getHex());
        result.push(palette.Vibrant.getHex());
        result.push(palette.DarkVibrant.getHex());
        result.push(palette.LightVibrant.getHex());

        me.setState({
          imageColors: result,
          colorSelection:[
            palette.Muted.getHex(),
            palette.DarkMuted.getHex(),
            palette.LightMuted.getHex(),
            palette.Vibrant.getHex(),
          ]
        });

        me.props.onResult(result);


      }

    });
  }


  render() {
    let me = this;

    return <div className={style.container}>
        {
          me.state.imageUrl ? <ResultPreview colors={me.state.imageColors}
                                             selection={me.state.colorSelection}
                                             imageUrl={me.state.imageUrl}
                                             outputColors={me.previewOutputHandler.bind(me)}/> :
            <Uploader uploadComplete={me.readImage.bind(me)}/>
        }

    </div>
  }
}

export default VibrantPalette;