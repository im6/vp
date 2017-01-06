import React, { PropTypes } from 'react';
import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import { Affix } from 'antd';
import EventListener, {withOptions} from 'react-event-listener';

import styles from './style.less';
import img from '!file!./assets/gradient.jpg';
import HeaderCenter from './components/HeaderCenter/index.jsx';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    let me = this;
    me.isloading = false;
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  logout(){
    let me = this;
    const ac = createAction('user/logoff');
    me.props.dispatch(ac());
  }

  resizeHandler(ev) {
    let me = this;
  };

  scrollHandler(ev) {
    let me = this;
    if(me.isloading){
      return false;
    }

    let elem = ev.target.scrollingElement;
    let scrollProgress = elem.scrollTop / (elem.scrollHeight - elem.clientHeight);
    if(scrollProgress > 0.96){
      me.isloading = true;

      let actcr = createAction('color/loadMore');
      me.props.dispatch(actcr());

      setTimeout(function(){
        me.isloading = false;
      }, 1800);
    }

  };

  render() {
    let me = this;
    var result = <div className={styles.layoutBox} >
      <EventListener
        target="window"
        onResize={me.resizeHandler.bind(me)}
        onScroll={me.scrollHandler.bind(me)}
        />

      <Affix>
        <HeaderCenter logout={me.logout.bind(me)} userInfo={me.props.user}/>
      </Affix>


      <div className={styles.main} style={{background: `#f5f6f7 url(${img}) repeat-x 0 0`}} >
        {me.props.children}
      </div>
    </div>;


    return result;
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

function mapStateToProps({user}){
  return {
    user
  }
}

export default connect(mapStateToProps)(Layout);
