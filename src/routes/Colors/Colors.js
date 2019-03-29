import React from 'react'
import { Card, Button } from 'antd';

class Colors extends React.Component {
  constructor(props) {
    super(props);
    this.onClickLike = this.onClickLike.bind(this);
  }
  onClickLike(){
    this.props.onLike(475);
  }
  render() {
    return <Card>
      Colors Like: &nbsp;&nbsp;
      <h1>{ this.props.colors.getIn(['0', 'like']) }</h1>
      <Button onClick={this.onClickLike}>Like</Button>
    </Card>
  }
}

export default Colors;


