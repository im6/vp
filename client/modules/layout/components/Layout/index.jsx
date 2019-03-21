import React from 'react';
import PropTypes from 'prop-types';
//import Slideout from 'slideout';
import styles from './style.less';
import './slideout.css';
import HeaderCenter from '../HeaderCenter';
//import SlideoutMenu from '../SlideoutMenu';

let slideout = null;

class Layout extends React.Component {
  constructor(props) {
    super(props);
    const me = this;
  }

  logout(){
    const me = this;
    me.props.onLogout();
  }

  render() {
    const me = this;
    const result = (<div className={styles.layoutBox} >
      {/* <nav ref="menu">
        <SlideoutMenu view={me.props.view}
                      onClick={me.onSlideoutMenuClick.bind(me)}
          />
      </nav> */}

      <main ref="panel">
        <HeaderCenter logout={me.logout.bind(me)}
                      isNavBtnActive={true}
                      currentView={me.props.view}
                      userInfo={me.props.user}/>
        <div
          style={{minHeight: document.body.clientHeight + 2}}
          className={styles.main}>
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
