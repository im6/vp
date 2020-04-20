import { connect } from 'react-redux';
import { createAction } from 'redux-actions';
import NewColor from './components/NewColor';

const mapStateToProps = (
  { user },
  { location: { pathname, search }, history }
) => {
  const defaultColors = search.match(/[a-f0-9]{24}/);
  const showUpload = pathname === '/extract';
  const isAuth = user.get('isAuth');
  return {
    showUpload,
    isAuth,
    onRedirect: history.push,
    defaultColors: defaultColors && defaultColors[0],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd(color) {
      const ac = createAction('color/addNew');
      dispatch(ac({ color }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewColor);
