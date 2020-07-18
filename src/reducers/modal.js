/* eslint-disable no-useless-computed-key, object-shorthand  */
import { handleActions } from 'redux-actions';

const initialState = {
  message: null,
  type: null,
};

const modal = handleActions(
  {
    ['modal/admin/getList/fail']() {
      return {
        message: 'Admin data error',
        type: 'danger',
      };
    },
    ['modal/admin/decideColor/success']() {
      return {
        message: 'Adjudicate successfully',
        type: 'success',
      };
    },
    ['modal/admin/decideColor/fail']() {
      return {
        message: 'Adjudicate failed',
        type: 'danger',
      };
    },

    // color reducer

    ['modal/color/get/fail']() {
      return {
        message: 'Get color data error.',
        type: 'danger',
      };
    },
    ['modal/color/copy'](_, { payload }) {
      return {
        message: `Copy to clipboard successfully: ${payload}`,
        type: 'success',
      };
    },
    ['modal/color/addNew/success']() {
      return {
        message: 'Create color successfully, thanks.',
        type: 'success',
      };
    },
    ['modal/color/addNew/fail']() {
      return {
        message: 'Create color failed.',
        type: 'danger',
      };
    },
    ['modal/color/addNew/invalid'](_, { payload }) {
      return {
        message: `Invalid color value: ${payload}`,
        type: 'danger',
      };
    },

    // user reducer

    ['modal/user/logoff']() {
      return {
        message: 'Logout successfully.',
        type: 'info',
      };
    },
    ['modal/user/auth/fail']() {
      return {
        message: 'Log in failed',
        type: 'danger',
      };
    },
  },
  initialState
);

export default modal;
