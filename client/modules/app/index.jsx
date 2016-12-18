import React, { PropTypes } from 'react';
import Layout from '../layout/index.jsx';
import QueueAnim from 'rc-queue-anim';
import { default as appService } from './service';

class App extends React.Component {
  constructor(prop){
    super(prop);
    let me = this;
    me.state = {
      childrenCurrent: null,
      isTransitionSlot: false
    };
  }
  shouldComponentUpdate(nextprops, nextstate){
    let me = this;

    const isSame = appService.compareRoutes(nextprops.routes, me.props.routes);
    let willChange = !isSame || me.state.isTransitionSlot;
    return willChange;
  }

  componentWillMount() {
    let me = this;
    me.setDelayEffect();
  }

  componentWillReceiveProps(nextProps){

    let me = this;
    let isSame = appService.compareRoutes(nextProps.routes, me.props.routes);
    if(isSame){
      return;
    }else{
      me.setDelayEffect();
    }

  }

  setDelayEffect(){
    let me = this;
    me.setState({
      childrenCurrent: null,
      isTransitionSlot: true,
    });
    setTimeout(function(){
      me.setState({
        childrenCurrent: me.props.children,
        isTransitionSlot: false
      });
    }, 600);
  }

  render(){
    let me = this;
    return (<Layout>
      <QueueAnim delay={50}
                 type={['right','left']}
                 ease={['easeOutQuart', 'easeInOutQuart']} >
        {
          me.state.childrenCurrent?
            <div key="a">
              {me.state.childrenCurrent}
            </div>
            : null
        }
      </QueueAnim>
    </Layout>);
  }
}

export default App;