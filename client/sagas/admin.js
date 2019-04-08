import { takeEvery, takeLatest } from 'redux-saga/effects';
import { call, put, fork } from 'redux-saga/effects';
import requester from '../services/requester';
import { createAction } from 'redux-actions';

function* watchers(a) {
  yield takeLatest("admin/getList", getAnonymousColor);
  yield takeLatest("admin/decideColor", postDecideColor);
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

function* postDecideColor(action) {
  try {
    const payload = yield call(requester, '/api/postDecideColor', action.payload);
    yield put({
      type: "admin/decideColor/success",
      payload: {
        id: action.payload.id
      }
    });
  } catch (e) {
    yield put({
      type: "admin/decideColor/fail",
      payload: {msg: e}
    });
  }
}

export default function*(){
  yield fork(watchers);
}