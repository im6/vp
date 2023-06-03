import { createAction } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import AdminPanel from './AdminPanel';

const mapStateToProps = ({ admin }) => admin;

const mapDispatchToProps = (dispatch) => ({
  onInitList() {
    const ac0 = createAction('admin/getList');
    dispatch(ac0());
  },
  onAdjudicate(id, willLike) {
    const actcr = createAction('admin/decideColor');
    dispatch(
      actcr({
        id,
        willLike,
      })
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
