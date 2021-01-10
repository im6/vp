import { connect } from 'react-redux';
import { createAction } from 'redux-actions';
import { withRouter } from 'react-router-dom';
import Header from './components/Header';
import { languages } from '../../translation';

const mapStateToProps = ({ user, color }, { location }) => {
  const { pathname: url } = location;
  const detail = user.get('detail');
  const facebookUrl = user.get('facebookUrl');
  const likeNum = color.get('liked').size;

  return {
    url,
    detail,
    likeNum,
    languages,
    facebookUrl,
  };
};

export const mapDispatchToProps = (dispatch) => ({
  onLogout() {
    const ac = createAction('user/logoff');
    dispatch(ac());

    const ac1 = createAction('modal/user/logoff');
    dispatch(ac1());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
