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
    onApprove(id) {
      const actcr = createAction('admin/decideColor');
      dispatch(actcr({
        id,
        display: 0,
      }));
    },
    onDelete(id) {
      const actcr = createAction('admin/decideColor');
      dispatch(actcr({
        id,
        display: 1,
      }));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);