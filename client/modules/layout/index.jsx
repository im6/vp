import React, { PropTypes } from 'react';
import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import { Affix } from 'antd';
import Slideout from 'slideout';
import EventListener, {withOptions} from 'react-event-listener';

import styles from './style.less';
import '!style!css!./slideout.css';

import img from '!file!./assets/gradient.jpg';

import HeaderCenter from './components/HeaderCenter';
import SlideoutMenu from './components/SlideoutMenu';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    let me = this;
    me.isloading = false;
    me.state = {
      isMenuView: false
    };
  }

  componentDidMount() {
    let me = this;
    me.initSlideout();
  }

  componentWillUnmount() {
  }

  initSlideout(){
    let me = this;
    var slideout = new Slideout({
      'panel': document.getElementById('panel'),
      'menu': document.getElementById('menu'),
      'padding': 230,
      'tolerance': 70
    });
    document.querySelector('.toggle-button').addEventListener('click', function() {
      slideout.toggle();

    });
    slideout.on('open', () => {
      me.setState({
        isMenuView: true
      });
    });
    slideout.on('close', () => {
      me.setState({
        isMenuView: false
      });
    });
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

      <nav id="menu" style={{overflow:'hidden'}}>
        <SlideoutMenu/>
      </nav>

      <main id="panel">
        <Affix>
          <HeaderCenter logout={me.logout.bind(me)}
                        isNavBtnActive={me.state.isMenuView}
                        currentPath={me.props.currentPath}
                        userInfo={me.props.user}/>
        </Affix>
        <div className={styles.main} style={{background: `#f5f6f7 url(${img}) repeat-x 0 0`}} >
          {me.props.children}
        </div>
      </main>

    </div>;

    return result;
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

function mapStateToProps({routing, user}){
  return {
    user,
    currentPath: routing.locationBeforeTransitions.pathname
  }
}

export default connect(mapStateToProps)(Layout);
