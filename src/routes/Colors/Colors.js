import React from 'react'
// import { Card, Button } from 'antd';
import Box from '../../components/Box'

class Colors extends React.Component {
  constructor(props) {
    super(props);
  }
  onLikeClickHandler(id, btnStatus){
    debugger
    this.props.onLike(id, btnStatus);
  }
  render() {
    return <div>
      {
        this.props.colors.map((v, k) => {
          return (<Box
            boxInfo={v}
            onLikeClick={me.onLikeClickHandler.bind(me, v.get('id'))}
            />);
        })
      }
    </div>
  }
}

export default Colors;


