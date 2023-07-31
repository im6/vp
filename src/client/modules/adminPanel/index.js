import { createAction } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import AdminPanel from './AdminPanel';

const mapStateToProps = ({ admin }) => admin;

const mapDispatchToProps = (dispatch) => ({
  onInitList() {
    const ac = createAction('admin/getList');
    dispatch(ac());
  },
  onAdjudicate(id, willLike) {
    const ac = createAction('admin/decideColor');
    dispatch(
      ac({
        id,
        willLike,
      })
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
