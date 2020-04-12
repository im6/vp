import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from './style.sass';
import TranslationIcon from './components/TranslationIcon';
import LanguageDropdown from './components/LanguageDropdown';
import { LanguageContext } from '../LanguageContext';
import { cdnUrl } from '../../constant';

const { selected } = style;

const Header = ({
  url,
  detail,
  likeNum,
  showVertical,
  facebookUrl,
  languages,
  onLogout,
  onRedirect,
  onChangeLang,
  onChangeCanvasDirection,
}) => {
  const [isMenuOpen, toggleMenu] = useState(false);
  const language = useContext(LanguageContext);

  const isAuth = Boolean(detail);
  const selectPopular = url === '/popular';
  const selectLatest = url in { '/latest': true, '/': true };
  const selectSaved = url === '/like';
  const selectCreate = url === '/new';
  const userImgUrl = isAuth && detail.get('img');
  const imagUrl = userImgUrl || `${cdnUrl}/icon.png`;

  const onCloseNav = () => {
    toggleMenu(false);
  };
  const onClickToScroll = () => {
    toggleMenu(false);
    window.scrollTo(0, 0);
  };
  const onClickRotate = () => {
    toggleMenu(false);
    onChangeCanvasDirection(!showVertical);
  };

  return (
    <nav
      className="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <div
          title="click to rotate"
          aria-label="click to rotate"
          className={`navbar-item ${style.iconWrapper}`}
          onClick={onClickRotate}
        >
          <img
            src={imagUrl}
            className={`${userImgUrl || showVertical ? '' : style.rotate}`}
            alt="colorpk icon"
          />
        </div>
        <a
          role="nav toggle btn"
          className="navbar-burger burger"
          aria-label="nav menu"
          aria-expanded="false"
          onClick={() => toggleMenu((v) => !v)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className={`navbar-menu ${isMenuOpen ? 'is-active' : ''}`}>
        <div className="navbar-start">
          {isAuth ? (
            <div className="navbar-item has-dropdown is-hoverable">
              <a
                className={`navbar-link ${
                  ['/like', '/portfolio'].includes(url) ? selected : ''
                }`}
              >
                {detail.get('name')}
              </a>

              <div className="navbar-dropdown">
                <Link
                  className="navbar-item"
                  to="/portfolio"
                  onClick={onClickToScroll}
                >
                  {language.profile}
                </Link>
                <Link
                  to="/like"
                  className="navbar-item"
                  onClick={onClickToScroll}
                >
                  {language.like}
                </Link>
                {detail.get('isadmin') && (
                  <Link
                    to="/adminpanel"
                    className="navbar-item"
                    onClick={onClickToScroll}
                  >
                    {language.admin}
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <Link
              to="/like"
              className={`navbar-item ${selectSaved ? selected : ''}`}
              onClick={onClickToScroll}
            >
              {language.like}
              {likeNum > 0 && ` (${likeNum})`}
            </Link>
          )}

          <Link
            to="/popular"
            className={`navbar-item ${selectPopular ? selected : ''}`}
            onClick={onCloseNav}
          >
            {language.popular}
          </Link>
          <Link
            to="/latest"
            className={`navbar-item ${selectLatest ? selected : ''}`}
            onClick={onCloseNav}
          >
            {language.latest}
          </Link>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">{language.more}</a>

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
              <span className={style.translationText}>{language.language}</span>
            </a>
            <LanguageDropdown languages={languages} onChange={onChangeLang} />
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {!selectCreate && (
                <Link
                  to="/new"
                  className="button is-primary"
                  onClick={onClickToScroll}
                >
                  {language.newColor}
                </Link>
              )}
              &nbsp;&nbsp;
              {isAuth ? (
                <button
                  className="button is-danger"
                  onClick={(evt) => {
                    evt.preventDefault();
                    onLogout();
                    onRedirect('/');
                    onCloseNav();
                  }}
                >
                  {language.logOut}
                </button>
              ) : (
                <a className="button is-info" href={facebookUrl}>
                  {language.fbLogin}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

Header.propTypes = {
  url: PropTypes.string,
  detail: PropTypes.object,
  facebookUrl: PropTypes.string,
  likeNum: PropTypes.number,
  showVertical: PropTypes.bool,
  languages: PropTypes.array.isRequired,
  onLogout: PropTypes.func.isRequired,
  onRedirect: PropTypes.func.isRequired,
  onChangeLang: PropTypes.func.isRequired,
  onChangeCanvasDirection: PropTypes.func.isRequired,
};

export default Header;
