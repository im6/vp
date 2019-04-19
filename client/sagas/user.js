import { takeLatest } from 'redux-saga/effects';
import { call, put, fork } from 'redux-saga/effects';
import requester from '../services/requester';
import { createAction } from 'redux-actions';
import { message } from 'antd';

function* initAuth() {
  try {
    const payload = yield call(requester, '/api/getInitAuth');
    yield put({
      type: "user/initAuth/success",
      payload,
    });
  } catch (e) {
    yield put({
      type: "user/initAuth/fail",
      payload: {msg: e}
    });
  }
}

function* logoff() {
  yield call(requester, '/api/logoff');
  message.success('Log off successfully!');
}

function onOAuth(action) {
  window.location.replace(action.payload);
}

function* getUserInfo(action) {
  const payload = yield call(requester, '/api/getUserInfo');
  yield put({
    type: "user/get/success",
    payload,
  });
  if(payload.isAuth) {
    message.success('Welcome! ' + payload.profile.name);
    if(payload.like && payload.like.length) {
      yield put({
        type: "color/set/likes",
        payload: payload.like
      });
    }
  }
}

function* watchers(a) {
  yield takeLatest("user/logoff", logoff);
  yield takeLatest("user/initAuth", initAuth);
  yield takeLatest('user/onOAuth', onOAuth)
  yield takeLatest('user/get', getUserInfo)
}

export default function*(){
  yield fork(watchers);
}