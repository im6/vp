/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import SpinLoader from '../../client/modules/color/components/SpinLoader';
import TranslationIcon from '../../client/modules/layout/Header/TranslationIcon';

const selectClassName = '_1-i7j';

const App = ({ url }) => {
  const showOneColor = url.match(/^\/color\/\d+$/);
  const selectPopular = url === '/popular';
  const selectLatest = url in { '/latest': true, '/': true };
  const showColorList =
    showOneColor ||
    url in
      {
        '/latest': true,
        '/': true,
        '/popular': true,
        '/like': true,
        '/portfolio': true,
      };

  return (
    <Fragment>
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
                Popular
              </a>
              <a
                className={`navbar-item ${selectLatest ? selectClassName : ''}`}
                href="/latest"
              >
                Latest
              </a>
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">More</a>
                <div className="navbar-dropdown">
                  <a className="navbar-item" href="//www.colorpk.com">
                    ColorPK v2.0
                  </a>
                  <a className="navbar-item" href="//www.colorpk.com/about">
                    About
                  </a>
                  <hr className="navbar-divider" />
                  <a className="navbar-item" href="//github.com/im6/vp/issues">
                    Report an issue
                  </a>
                </div>
              </div>
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  <TranslationIcon />
                  <span className="_3QtW-">Language</span>
                </a>
                <div className="navbar-dropdown">
                  <a className="navbar-item">English</a>
                  <a className="navbar-item">简体中文</a>
                  <a className="navbar-item">日本語</a>
                  <a className="navbar-item">한국어</a>
                  <a className="navbar-item">Español</a>
                  <a className="navbar-item">Русский</a>
                </div>
              </div>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <a className="button is-primary" href="/new">
                    New Color
                  </a>
                  &nbsp;&nbsp;
                </div>
              </div>
            </div>
          </div>
        </nav>
        <SpinLoader />
        {showColorList && (
          <div className="_10E_t">
            <div className="_1oXEb" />
          </div>
        )}
      </div>
    </Fragment>
  );
};

App.propTypes = {
  url: PropTypes.string.isRequired,
};

export default App;
