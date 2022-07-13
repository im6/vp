/* eslint-disable no-useless-computed-key, object-shorthand  */
import { handleActions } from 'redux-actions';

const initialState = {
  type: null,
  message: null,
};

const modal = handleActions(
  {
    ['modal/reset']() {
      return initialState;
    },

    // admin reducer

    ['modal/admin/getList/fail']() {
      return {
        type: 'danger',
        message: 'Admin data error',
      };
    },
    ['modal/admin/decideColor/success']() {
      return {
        type: 'success',
        message: 'Adjudicate successfully',
      };
    },
    ['modal/admin/decideColor/fail']() {
      return {
        type: 'danger',
        message: 'Adjudicate failed',
      };
    },

    // color reducer

    ['modal/color/get/fail']() {
      return {
        type: 'danger',
        message: 'Get color data error.',
      };
    },
    ['modal/color/copy']() {
      return {
        type: 'success',
        message: 'Copy to clipboard successfully',
      };
    },
    ['modal/color/addNew/success']() {
      return {
        type: 'success',
        message: 'Create color successfully, thanks.',
      };
    },
    ['modal/color/addNew/fail']() {
      return {
        type: 'danger',
        message: 'Create color failed.',
      };
    },
    ['modal/color/addNew/invalid']() {
      return {
        type: 'danger',
        message: 'Invalid color value.',
      };
    },
    ['modal/color/download']() {
      return {
        type: 'link',
        message: 'Downloading ...',
      };
    },

    // user reducer

    ['modal/user/logoff']() {
      return {
        type: 'info',
        message: 'Logout successfully.',
      };
    },
    ['modal/user/auth/fail']() {
      return {
        type: 'danger',
        message: 'Log in failed',
      };
    },
  },
  initialState
);

export default modal;
