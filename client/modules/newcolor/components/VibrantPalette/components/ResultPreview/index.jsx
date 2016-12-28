import React from 'react';
import { Checkbox } from 'antd';
import style from './style.less';

const CheckboxGroup = Checkbox.Group;

class ResultPreview extends React.Component {
  constructor(props) {
    super(props);
    let me = this;
  }

  componentDidMount() {
    let me = this;
  }

  componentWillUnmount() {
  }

  onChkboxClick(cl, ev){
    let me = this;
    let isChecked = ev.target.checked;
    let current = me.props.selection;
    let newList = null;

    if(isChecked){
      if(current.length == 4){
        let removeIndex = Math.floor(Math.random() * current.length);
        let current3 = current.filter((v,k) => {
          return k != removeIndex;
        });
        newList = [...current3, cl];
      }else{
        newList = [...current, cl]
      }

    }else{
      newList = current.filter((v,k) => {
        return v != cl;
      });
    }
    me.props.outputColors(newList);
  }


  render() {
    let me = this;

    return <div className={style.previewContainer}>
      <div className={style.previewResult}>
        {
          me.props.colors.map((v,k) => {
            return (<Checkbox key={k} checked={me.props.selection.indexOf(v) > -1} onChange={me.onChkboxClick.bind(me, v)}>
              <div className={style.resultBox} style={{backgroundColor: v}}/>
            </Checkbox>);
          })
        }
      </div>
      <img src={me.props.imageUrl} alt="uploaded file"/>
    </div>
  }
}

export default ResultPreview;