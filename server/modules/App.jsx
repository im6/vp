/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';

import noop from '../../isomorphic/noop';
import ColorLoading from '../../isomorphic/ColorLoading';
import { LanguageContext } from '../../isomorphic/LanguageContext';
import LanguageDropdown from '../../isomorphic/LanguageDropdown';
import TranslationIcon from '../../client/modules/layout/Header/TranslationIcon';

const selectClassName = '_1-i7j';

class App extends React.Component {
  render() {
    const { url } = this.props;
    const selectPopular = url === '/popular';
    const selectLatest = url in { '/latest': true, '/': true };
    const language = this.context;

    return (
    <div className="Cqiyx">
      <nav
        className="navbar is-fixed-top"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img
              src="//dkny.oss-cn-hangzhou.aliyuncs.com/2/icon.png"
              height="32"
              width="32"
              alt="colorpk icon"
            />
          </a>
          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className="navbar-menu ">
          <div className="navbar-start">
            <a
              className={`navbar-item ${
                selectPopular ? selectClassName : ''
              }`}
              href="/popular"
            >
              {language.popular}
            </a>
            <a
              className={`navbar-item ${selectLatest ? selectClassName : ''}`}
              href="/latest"
            >
              {language.latest}
            </a>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                {language.more}
              </a>
              <div className="navbar-dropdown">
                <a className="navbar-item" href="//www.colorpk.com">
                  ColorPK v2.0
                </a>
                <a className="navbar-item" href="//www.colorpk.com/about">
                 {language.about}
                </a>
                <hr className="navbar-divider" />
                <a className="navbar-item" href="//github.com/im6/vp/issues">
                  {language.reportIssue}
                </a>
              </div>
            </div>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                <TranslationIcon />
                <span className="_3QtW-">
                  {language.language}
                </span>
              </a>
              <LanguageDropdown onChange={noop} />
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-primary" href="/new">
                {language.newColor}
                </a>
                &nbsp;&nbsp;
              </div>
            </div>
          </div>
        </div>
      </nav>
      <ColorLoading url={url} />
    </div>)
  }
}

App.propTypes = {
  url: PropTypes.string.isRequired,
};
App.contextType = LanguageContext;

export default App;
