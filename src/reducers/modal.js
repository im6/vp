/* eslint-disable no-useless-computed-key, object-shorthand  */
import { handleActions } from 'redux-actions';
import produce from 'immer';

const initialState = {
  type: null,
  message: null,
  visible: false,
};

const modal = handleActions(
  {
    ['modal/cycle/show'](state) {
      return produce(state, (draft) => {
        draft.visible = true;
      });
    },
    ['modal/cycle/hide'](state) {
      return produce(state, (draft) => {
        draft.visible = false;
      });
    },
    ['modal/cycle/reset']() {
      return initialState;
    },

    // admin reducer

    ['modal/admin/getList/fail']() {
      return {
        type: 'danger',
        message: 'Admin data error',
        visible: false,
      };
    },
    ['modal/admin/decideColor/success']() {
      return {
        type: 'success',
        message: 'Adjudicate successfully',
        visible: false,
      };
    },
    ['modal/admin/decideColor/fail']() {
      return {
        type: 'danger',
        message: 'Adjudicate failed',
        visible: false,
      };
    },

    // color reducer

    ['modal/color/get/fail']() {
      return {
        type: 'danger',
        message: 'Get color data error.',
        visible: false,
      };
    },
    ['modal/color/copy']() {
      return {
        type: 'success',
        message: 'Copy to clipboard successfully',
        visible: false,
      };
    },
    ['modal/color/addNew/success']() {
      return {
        type: 'success',
        message: 'Create color successfully, thanks.',
        visible: false,
      };
    },
    ['modal/color/addNew/fail']() {
      return {
        type: 'danger',
        message: 'Create color failed.',
        visible: false,
      };
    },
    ['modal/color/addNew/invalid']() {
      return {
        type: 'danger',
        message: 'Invalid color value.',
        visible: false,
      };
    },
    ['modal/color/download']() {
      return {
        type: 'link',
        message: 'Downloading ...',
        visible: false,
      };
    },

    // user reducer

    ['modal/user/logoff']() {
      return {
        type: 'info',
        message: 'Logout successfully.',
        visible: false,
      };
    },
    ['modal/user/auth/fail']() {
      return {
        type: 'danger',
        message: 'Log in failed',
        visible: false,
      };
    },
    ['modal/user/greet'](_, { payload }) {
      return {
        type: 'success',
        message: `Welcome back, ${payload}`,
        visible: false,
      };
    },
  },
  initialState
);

export default modal;
