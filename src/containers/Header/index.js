import { connect } from 'react-redux';
import { createAction } from 'redux-actions';
import { withRouter } from 'react-router-dom';
import Header from 'components/Header';
import { languages } from '../../translation';

const mapStateToProps = ({ user, color }, { location }) => {
  const { pathname: url } = location;
  const detail = user.get('detail');
  const facebookUrl = user.get('facebookUrl');
  const likeNum = color.get('liked').size;
  const showVertical = color.get('showVertical');

  return {
    url,
    detail,
    likeNum,
    languages,
    facebookUrl,
    showVertical,
  };
};

export const mapDispatchToProps = (dispatch) => ({
  onLogout() {
    const ac = createAction('user/logoff');
    dispatch(ac());

    const ac1 = createAction('modal/user/logoff');
    dispatch(ac1());
  },
  onChangeLang(lang) {
    const ac = createAction('user/setLanguage');
    dispatch(ac(lang));
  },
  onChangeCanvasDirection(isVertical) {
    const ac = createAction('color/setDirection');
    dispatch(ac(isVertical));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
