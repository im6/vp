import { connect } from 'react-redux';
import { createAction } from 'redux-actions';
import NewColor from './components/NewColor';

const mapDispatchToProps = (dispatch) => ({
  onAdd(color) {
    const ac = createAction('color/addNew');
    dispatch(ac({ color }));
  },
  onColorInvalid() {
    const ac = createAction('modal/color/addNew/invalid');
    dispatch(ac());
  },
});

export default connect(null, mapDispatchToProps)(NewColor);
