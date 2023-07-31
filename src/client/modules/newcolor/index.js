import { connect } from 'react-redux';
import { createAction } from '@reduxjs/toolkit';
import NewColor from './components/NewColor';

const mapDispatchToProps = (dispatch) => ({
  onAdd(color) {
    const ac = createAction('color/addNew');
    dispatch(ac({ color }));
  },
  onColorInvalid() {
    const ac = createAction('modal');
    dispatch(ac(['danger', 'Invalid color value.']));
  },
});

export default connect(null, mapDispatchToProps)(NewColor);
