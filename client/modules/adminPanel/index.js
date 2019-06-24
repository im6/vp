import React from 'react';
import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import AdminPanel from './components/AdminPanel';

function mapStateToProps({admin}){
  return {
    list: admin.get('list'),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onInitLoad() {
      const actcr = createAction('admin/getList');
      dispatch(actcr());
    },
    onApprove(id) {
      const actcr = createAction('admin/decideColor');
      dispatch(actcr({
        id,
        willLike: true,
      }));
    },
    onDelete(id) {
      const actcr = createAction('admin/decideColor');
      dispatch(actcr({
        id,
        willLike: false,
      }));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);