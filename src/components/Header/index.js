import { connect } from 'react-redux';
import { createAction } from '@reduxjs/toolkit';
import Header from './components/Header';
import { languages } from '../../translation';

const mapStateToProps = ({ user, color }) => {
  const { detail, weiboUrl, githubUrl, facebookUrl } = user;
  const likeNum = color.liked.length;

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
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
