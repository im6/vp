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
    slideout = new Slideout({
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

  onSlideoutMenuClick(selection){
    let me = this;
    setTimeout(()=>{
      slideout.close();
    }, 650);
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

      <nav id="menu" style={{overflow:'hidden'}}>
        <SlideoutMenu onClick={me.onSlideoutMenuClick.bind(me)}/>
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
