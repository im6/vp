import { connect } from 'react-redux';
import { createAction } from 'redux-actions';
import { withRouter } from 'react-router-dom';
import Header from 'components/Header';

const shared = {};
const mapStateToProps = ({ user, color }, { location, history }) => {
  shared.history = history;
  const { pathname: url } = location;
  const detail = user.get('detail');
  const facebookUrl = user.get('facebookUrl');
  const likeNum = color.get('liked').size;
  const showVertical = color.get('showVertical');

  return {
    likeNum,
    url,
    detail,
    facebookUrl,
    showVertical,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOAuth(url) {
      const ac = createAction('user/onOAuth');
      dispatch(ac(url));
    },
    onLogout() {
      const ac = createAction('user/logoff');
      dispatch(ac());
      shared.history.push('/');
    },
    onChangeLang(lang) {
      const ac = createAction('user/setLanguage');
      dispatch(ac(lang));
    },
    onChangeCanvasDirection(isVertical) {
      const ac = createAction('color/setDirection');
      dispatch(ac(isVertical));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
