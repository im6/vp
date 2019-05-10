import { takeLatest } from 'redux-saga/effects';
import { call, put, fork } from 'redux-saga/effects';
import requester from '../services/requester';
import { createAction } from 'redux-actions';

function* watchers() {
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
    window.location.replace('/');
  }
}

function* postDecideColor(action) {
  const payload = yield call(requester, '/api/postDecideColor', action.payload);
    if(payload.error){
      yield put({
        type: "admin/decideColor/fail",
        payload
      });
    } else {
      yield put({
        type: "admin/decideColor/success",
        payload: action.payload.id
      });
    }
}

export default function*(){
  yield fork(watchers);
}
