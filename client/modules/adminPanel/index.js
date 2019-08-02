import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import AdminPanel from './components/AdminPanel';

function mapStateToProps({ admin }) {
  return {
    list: admin.get('list'),
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onInit() {
      const ac0 = createAction('admin/getList');
      dispatch(ac0());

      const ac1 = createAction('user/auth');
      dispatch(ac1());
    },
    onApprove(id) {
      const actcr = createAction('admin/decideColor');
      dispatch(
        actcr({
          id,
          willLike: true,
        })
      );
    },
    onDelete(id) {
      const actcr = createAction('admin/decideColor');
      dispatch(
        actcr({
          id,
          willLike: false,
        })
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPanel);
