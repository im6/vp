import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from './style.sass';
import TranslationIcon from './components/TranslationIcon';
import LanguageDropdown from './components/LanguageDropdown';
import { LanguageContext } from '../LanguageContext';

const iconUrl = '//dkny.oss-cn-hangzhou.aliyuncs.com/2/icon.png';
const { selected: selectedStyleName } = style;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
    this.onFBClick = this.onFBClick.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.onClickNav = this.onClickNav.bind(this);
    this.onClickTitleIcon = this.onClickTitleIcon.bind(this);
  }

  toggleMobileMenu() {
    this.setState({
      showMenu: !this.state.showMenu,
    });
  }
  onClickNav() {
    if (this.state.showMenu) {
      this.setState({
        showMenu: false,
      });
    }
  }
  onFBClick(evt) {
    evt.preventDefault();
    this.props.onOAuth(this.props.facebookUrl);
  }

  onClickTitleIcon() {
    const { onChangeCanvasDirection, showVertical } = this.props;
    this.onClickNav();
    onChangeCanvasDirection(!showVertical);
  }

  onLogout() {
    this.props.onLogout();
  }

  render() {
    const { url, detail, likeNum, showVertical, facebookUrl } = this.props;
    const isAuth = Boolean(detail);
    const language = this.context;
    const selectPopular = url === '/popular';
    const selectLatest = url in { '/latest': true, '/': true };
    const selectSaved = url === '/like';
    const userImgUrl = isAuth && detail.get('img');
    const imagUrl = userImgUrl || iconUrl;

    return (
      <nav
        className="navbar is-fixed-top"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <div
            title="click to rotate"
            className={`navbar-item ${style.iconWrapper}`}
            onClick={this.onClickTitleIcon}
          >
            <img
              src={imagUrl}
              className={`${userImgUrl || showVertical ? '' : style.rotate}`}
              alt="colorpk icon"
            />
          </div>
          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            onClick={this.toggleMobileMenu}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          className={`navbar-menu ${this.state.showMenu ? 'is-active' : ''}`}
        >
          <div className="navbar-start">
            {isAuth ? (
              <div className="navbar-item has-dropdown is-hoverable">
                <a
                  className={`navbar-link ${
                    ['/like', '/portfolio'].includes(url)
                      ? selectedStyleName
                      : ''
                  }`}
                >
                  {detail.get('name')}
                </a>

                <div className="navbar-dropdown">
                  <Link
                    className="navbar-item"
                    to="/portfolio"
                    onClick={() => {
                      this.onClickNav();
                    }}
                  >
                    {language.profile}
                  </Link>
                  <Link
                    to="/like"
                    className="navbar-item"
                    onClick={() => {
                      this.onClickNav();
                    }}
                  >
                    {language.like}
                  </Link>
                  {detail.get('isadmin') && (
                    <Link
                      to="/adminpanel"
                      className="navbar-item"
                      onClick={this.onClickNav}
                    >
                      {language.admin}
                    </Link>
                  )}
                  <hr className="navbar-divider" />
                  <a
                    className="navbar-item"
                    onClick={ev => {
                      ev.preventDefault();
                      this.onLogout();
                    }}
                  >
                    {language.logOut}
                  </a>
                </div>
              </div>
            ) : (
              <Link
                to="/like"
                className={`navbar-item ${
                  selectSaved ? selectedStyleName : ''
                }`}
                onClick={this.onClickNav}
              >
                {language.like}
                {likeNum > 0 && ` (${likeNum})`}
              </Link>
            )}

            <Link
              to="/popular"
              className={`navbar-item ${
                selectPopular ? selectedStyleName : ''
              }`}
              onClick={this.onClickNav}
            >
              {language.popular}
            </Link>
            <Link
              to="/latest"
              className={`navbar-item ${selectLatest ? selectedStyleName : ''}`}
              onClick={this.onClickNav}
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
                <span className={style.translationText}>
                  {language.language}
                </span>
              </a>
              <LanguageDropdown onChange={this.props.onChangeLang} />
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link
                  to="/new"
                  className="button is-primary"
                  onClick={this.onClickNav}
                >
                  {language.newColor}
                </Link>
                &nbsp;&nbsp;
                {!isAuth && facebookUrl && (
                  <a className="button is-info" onClick={this.onFBClick}>
                    {language.fbLogin}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  url: PropTypes.string,
  detail: PropTypes.object,
  facebookUrl: PropTypes.string,
  likeNum: PropTypes.number,
  showVertical: PropTypes.bool,
  onLogout: PropTypes.func.isRequired,
  onOAuth: PropTypes.func.isRequired,
  onChangeLang: PropTypes.func.isRequired,
  onChangeCanvasDirection: PropTypes.func.isRequired,
};
Header.contextType = LanguageContext;

export default Header;
