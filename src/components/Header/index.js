import { connect } from 'react-redux';
import { createAction } from 'redux-actions';
import Header from './components/Header';
import { languages } from '../../translation';

const mapStateToProps = ({ user, color }) => {
  const { detail, weiboUrl, githubUrl, facebookUrl } = user;
  const likeNum = color.get('liked').size;

  return {
    detail,
    likeNum,
    languages,
    weiboUrl,
    githubUrl,
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
