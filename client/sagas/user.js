import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import requester from '../services/requester';
import { createAction } from 'redux-actions';

function* watchers(a) {
  yield [
    takeLatest("user/logoff", logoff),
  ]
}

function* logoff(action) {
  yield call(requester, '/api/logoff');
}

export default function*(){
  yield fork(watchers);
}