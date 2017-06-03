import React from 'react';
import PropTypes from 'prop-types';
import Slideout from 'slideout';
import { Global } from '../../../../config/global.js';
import styles from './style.less';
import '!style!css!./slideout.css';
import HeaderCenter from '../HeaderCenter';
import SlideoutMenu from '../SlideoutMenu';

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
    const me = this;
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

  onSlideoutMenuClick(){
    const me = this;
    if(!Global.isDev){
      setTimeout(()=>{
        slideout.close();
      }, 500);
    }
  }

  logout(){
    let me = this;
    me.props.onLogout();
  }

  render() {
    const me = this;
    const result = (<div className={styles.layoutBox} >
      <nav ref="menu">
        <SlideoutMenu view={me.props.view}
                      onClick={me.onSlideoutMenuClick.bind(me)}
          />
      </nav>

      <main ref="panel">
        <HeaderCenter logout={me.logout.bind(me)}
                      isNavBtnActive={me.state.isMenuView}
                      currentView={me.props.view}
                      userInfo={me.props.user}/>
        <div
          className={styles.main}
          style={{minHeight: document.body.clientHeight}} >
          {me.props.children}
        </div>
      </main>

    </div>);

    return result;
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
