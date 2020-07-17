import { connect } from 'react-redux';
import { createAction } from 'redux-actions';
import NewColor from './components/NewColor';

const mapStateToProps = (_, { location: { search }, history }) => {
  const searchLower = search.toLowerCase();
  const defaultColors = searchLower.match(/[a-f0-9]{24}/);
  return {
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
