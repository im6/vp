import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import requester from '../services/requester';
import { createAction } from 'redux-actions';

function* watchers(a) {
  yield [
    takeLatest("admin/getList", getAnonymousColor),
  ]
}


function* getAnonymousColor(action) {
  try {
    const payload = yield call(requester, '/api/getAnonymousColor');
    yield put({
      type: "admin/getList/success",
      payload: payload.result
    });
  } catch (e) {
    yield put({
      type: "admin/getList/fail",
      payload: {msg: e}
    });
  }
}


export default function*(){
  yield fork(watchers);
}