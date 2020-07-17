/* eslint-disable no-useless-computed-key, object-shorthand  */
import { handleActions } from 'redux-actions';

const initialState = {
  message: null,
  type: null,
};

const modal = handleActions(
  {
    ['modal/copy'](_, { payload }) {
      return {
        message: `Copy to clipboard successfully: ${payload}`,
        type: 'success',
      };
    },
    ['modal/logoff']() {
      return {
        message: 'Logout successfully.',
        type: 'info',
      };
    },
    ['modal/newColor/success']() {
      return {
        message: 'Create color successfully.',
        type: 'success',
      };
    },
    ['modal/newColor/fail']() {
      return {
        message: 'Create color failed.',
        type: 'danger',
      };
    },
  },
  initialState
);

export default modal;