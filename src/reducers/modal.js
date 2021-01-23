/* eslint-disable no-useless-computed-key, object-shorthand  */
import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

const initialState = fromJS({
  type: null,
  message: null,
});

const modal = handleActions(
  {
    ['modal/reset']() {
      return initialState;
    },

    // admin reducer

    ['modal/admin/getList/fail']() {
      return fromJS({
        message: 'Admin data error',
        type: 'danger',
      });
    },
    ['modal/admin/decideColor/success']() {
      return fromJS({
        message: 'Adjudicate successfully',
        type: 'success',
      });
    },
    ['modal/admin/decideColor/fail']() {
      return fromJS({
        message: 'Adjudicate failed',
        type: 'danger',
      });
    },

    // color reducer

    ['modal/color/get/fail']() {
      return fromJS({
        message: 'Get color data error.',
        type: 'danger',
      });
    },
    ['modal/color/copy']() {
      return fromJS({
        message: 'Copy to clipboard successfully',
        type: 'success',
      });
    },
    ['modal/color/addNew/success']() {
      return fromJS({
        message: 'Create color successfully, thanks.',
        type: 'success',
      });
    },
    ['modal/color/addNew/fail']() {
      return fromJS({
        message: 'Create color failed.',
        type: 'danger',
      });
    },
    ['modal/color/addNew/invalid']() {
      return fromJS({
        message: 'Invalid color value.',
        type: 'danger',
      });
    },
    ['modal/color/download']() {
      return fromJS({
        message: 'Downloading ...',
        type: 'link',
      });
    },

    // user reducer

    ['modal/user/logoff']() {
      return fromJS({
        message: 'Logout successfully.',
        type: 'info',
      });
    },
    ['modal/user/auth/fail']() {
      return fromJS({
        message: 'Log in failed',
        type: 'danger',
      });
    },
  },
  initialState
);

export default modal;
