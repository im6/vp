/* eslint-disable no-useless-computed-key, object-shorthand  */
import { handleActions } from 'redux-actions';

const initialState = {
  message: null,
  type: null,
  flag: false,
};

const modal = handleActions(
  {
    ['modal/admin/getList/fail']({ flag }) {
      return {
        message: 'Admin data error',
        type: 'danger',
        flag: !flag,
      };
    },
    ['modal/admin/decideColor/success']({ flag }) {
      return {
        message: 'Adjudicate successfully',
        type: 'success',
        flag: !flag,
      };
    },
    ['modal/admin/decideColor/fail']({ flag }) {
      return {
        message: 'Adjudicate failed',
        type: 'danger',
        flag: !flag,
      };
    },

    // color reducer

    ['modal/color/get/fail']({ flag }) {
      return {
        message: 'Get color data error.',
        type: 'danger',
        flag: !flag,
      };
    },
    ['modal/color/copy']({ flag }) {
      return {
        message: 'Copy to clipboard successfully',
        type: 'success',
        flag: !flag,
      };
    },
    ['modal/color/addNew/success']({ flag }) {
      return {
        message: 'Create color successfully, thanks.',
        type: 'success',
        flag: !flag,
      };
    },
    ['modal/color/addNew/fail']({ flag }) {
      return {
        message: 'Create color failed.',
        type: 'danger',
        flag: !flag,
      };
    },
    ['modal/color/addNew/invalid']({ flag }) {
      return {
        message: 'Invalid color value.',
        type: 'danger',
        flag: !flag,
      };
    },

    // user reducer

    ['modal/user/logoff']({ flag }) {
      return {
        message: 'Logout successfully.',
        type: 'info',
        flag: !flag,
      };
    },
    ['modal/user/auth/fail']({ flag }) {
      return {
        message: 'Log in failed',
        type: 'danger',
        flag: !flag,
      };
    },
  },
  initialState
);

export default modal;
