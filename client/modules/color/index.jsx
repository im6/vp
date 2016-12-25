import React from 'react';
import { Card, Icon, Steps } from 'antd';
import classnames from 'classnames';
import QueueAnim from 'rc-queue-anim';
import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import BoxList from './components/BoxList';
import SpinLoader from './components/SpinLoader';



class Color extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    let me = this;

    return <div>
      <BoxList list={me.props.color.get('list')}/>
      { me.props.color.get('loading') ? <SpinLoader /> : null }
    </div>
  }
}

function mapStateToProps({color}){
  return {
    color
  }
}

export default connect(mapStateToProps)(Color);
