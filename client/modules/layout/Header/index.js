import { connect } from 'react-redux';
import { createAction } from 'redux-actions';
import { withRouter } from 'react-router-dom';
import Header from './Header';

const shared = {};
const mapStateToProps = ({ user }, { location, history }) => {
  shared.history = history;
  const { pathname: url } = location;
  const isAuth = user.get('isAuth');
  const detail = user.get('detail');
  const authReady = user.get('authReady');
  const facebookUrl = user.get('facebookUrl');
  return {
    url,
    isAuth,
    detail,
    authReady,
    facebookUrl,
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
    onEnterProfile(name) {
      const ac = createAction('color/getUserColor');
      dispatch(ac(name));
    },
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
