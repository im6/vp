import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layout/index.jsx';
import QueueAnim from 'rc-queue-anim';
import { default as appService } from './service';

class App extends React.Component {
  constructor(prop){
    super(prop);
    const me = this;
    me.state = {
      childrenCurrent: null,
      isTransitionSlot: false
    };
  }
  shouldComponentUpdate(nextprops, nextstate){
    const me = this;
    const isSame = appService.compareRoutes(nextprops.routes, me.props.routes);
    let willChange = !isSame || me.state.isTransitionSlot;
    return willChange;
  }

  componentWillMount() {
    const me = this;
    me.setDelayEffect();
  }

  componentWillReceiveProps(nextProps){
    const me = this;
    let isSame = appService.compareRoutes(nextProps.routes, me.props.routes);
    if(isSame) {
      return;
    } else {
      let shouldEffect = appService.determineEffect(me.props.location.pathname, nextProps.location.pathname);
      if(shouldEffect){
        me.setDelayEffect();
      }else{
        me.setState({
          childrenCurrent: nextProps.children,
          isTransitionSlot: false
        });
      }
    }
  }

  setDelayEffect(){
    const me = this;
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
    const me = this;
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