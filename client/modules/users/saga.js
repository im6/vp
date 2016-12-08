import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { getUsers } from '../../services/resource.js';
import Immutable, {List} from 'immutable';

function* watchers(a) {
  yield [
    takeLatest("users/get", fetchUsers)
  ]
}

function* fetchUsers(action) {
  try {
    const payload = yield call(getUsers, action.payload);
    yield put({
      type: "users/get/success",
      payload: Immutable.fromJS(payload)
    });
  } catch (e) {
    yield put({
      type: "users/get/fail",
      payload: {msg: e}
    });
  }
}

export default function*(){
  yield fork(watchers);
  yield put({
    type:'users/get',
    payload:{
      test:"get some users initially"
    }
  });
}
