import React, { PropTypes } from 'react';
import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import Slideout from 'slideout';
import { Global } from '../../config/global.js';
import EventListener, {withOptions} from 'react-event-listener';

import styles from './style.less';
import '!style!css!./slideout.css';

import img from '!file!./assets/gradient.jpg';

import HeaderCenter from './components/HeaderCenter';
import SlideoutMenu from './components/SlideoutMenu';


let slideout = null;

class Layout extends React.Component {
  constructor(props) {
    super(props);
    let me = this;
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
    let { panel, menu } = me.refs;
    slideout = new Slideout({
      'panel': panel,
      'menu': menu,
      'padding': 230,
      'tolerance': 70,
      'touch': false
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

  onSlideoutMenuClick(selection){
    let me = this;
    if(!Global.isDev){
      setTimeout(()=>{
        slideout.close();
      }, 500);
    }
  }

  logout(){
    let me = this;
    const ac = createAction('user/logoff');
    me.props.dispatch(ac());
  }

  resizeHandler(ev) {
    let me = this;
  };

  render() {
    let me = this;
    var result = <div className={styles.layoutBox} >
      <EventListener
        target="window"
        onResize={me.resizeHandler.bind(me)}
        />

      <nav ref="menu">
        <SlideoutMenu onClick={me.onSlideoutMenuClick.bind(me)}/>
      </nav>

      <main ref="panel">
        <HeaderCenter logout={me.logout.bind(me)}
                      isNavBtnActive={me.state.isMenuView}
                      currentPath={me.props.currentPath}
                      userInfo={me.props.user}/>
        <div
          className={styles.main}
          style={{minHeight: document.body.clientHeight}} >
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
