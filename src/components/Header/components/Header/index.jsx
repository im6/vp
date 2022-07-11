import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import style from './style.sass';
import TranslationIcon from '../TranslationIcon';
import LanguageDropdown from '../LanguageDropdown';
import ToggleButton from '../ToggleButton';
import { imgCdnUrl } from '../../../../constant';
import useLayoutContext from '../../../../hooks/useLayoutContext';
import useTranslationContext from '../../../../hooks/useTranslationContext';

const { selected } = style;

const Header = ({
  detail,
  likeNum,
  weiboUrl,
  githubUrl,
  facebookUrl,
  languages,
  onLogout,
}) => {
  const location = useLocation();
  const url = location.pathname;
  const [isMenuOpen, toggleMenu] = useState(false);
  const [isVertical, setVertical] = useLayoutContext();
  const [language, setLanguage] = useTranslationContext();

  const isAuth = Boolean(detail);
  const isAdmin = isAuth && detail.get('isAdmin');
  const userImgUrl = isAuth && detail.get('img');
  const imagUrl = userImgUrl || `${imgCdnUrl}/icon.png`;

  const selectPopular = url === '/popular';
  const selectLatest = ['/', '/latest'].includes(url);
  const selectProfile = ['/like', '/portfolio'].includes(url);
  const selectSaved = url === '/like';
  const selectCreate = url === '/new';

  const onCloseNav = () => {
    toggleMenu(false);
  };
  const onClickToScroll = () => {
    toggleMenu(false);
    window.scrollTo(0, 0);
  };
  const onClickRotate = () => {
    toggleMenu(false);
    setVertical(!isVertical);
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
            className={`${userImgUrl || isVertical ? '' : style.rotate}`}
            alt="icon"
          />
        </div>
        <ToggleButton onClick={() => toggleMenu((v) => !v)} />
      </div>

      <div className={`navbar-menu ${isMenuOpen ? 'is-active' : ''}`}>
        <div className="navbar-start">
          {isAuth ? (
            <div className="navbar-item has-dropdown is-hoverable">
              <a className={`navbar-link ${selectProfile ? selected : ''}`}>
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
                {isAdmin && (
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

          <div
            className={`navbar-item has-dropdown is-hoverable ${style.wideScreenOnly}`}
          >
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
            <LanguageDropdown languages={languages} onChange={setLanguage} />
          </div>
        </div>

        <div className="navbar-end">
          {isAuth ? (
            <div className="navbar-item">
              <Link
                className="button is-danger"
                to="/"
                onClick={() => {
                  onLogout();
                  onCloseNav();
                }}
              >
                {language.logOut}
              </Link>
            </div>
          ) : (
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">{language.navLogin}</a>
              <div className="navbar-dropdown">
                <a className="navbar-item" href={weiboUrl}>
                  微博
                </a>
                <a className="navbar-item" href={githubUrl}>
                  GitHub
                </a>
                {facebookUrl && (
                  <a className="navbar-item" href={facebookUrl}>
                    FaceBook
                  </a>
                )}
              </div>
            </div>
          )}
          {!selectCreate && (
            <div className="navbar-item">
              <Link
                to="/new"
                className="button is-primary"
                onClick={onClickToScroll}
              >
                {language.newColor}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

Header.propTypes = {
  detail: PropTypes.object,
  weiboUrl: PropTypes.string,
  githubUrl: PropTypes.string,
  facebookUrl: PropTypes.string,
  likeNum: PropTypes.number,
  languages: PropTypes.array.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Header;
