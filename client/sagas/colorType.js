import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import requester from '../services/requester';
import { createAction } from 'redux-actions';

function* watchers(a) {
  yield [
    takeLatest("colorType/get", getColorType),
  ]
}


function* getColorType(action) {
  try {
    const payload = yield call(requester, '/api/getColorType');
    yield put({
      type: "colorType/get/success",
      payload: payload.result
    });
  } catch (e) {
    yield put({
      type: "colorType/get/fail",
      payload: {msg: e}
    });
  }
}


export default function*(){
  yield fork(watchers);

  let actCreater = createAction('colorType/get');
  yield put(actCreater());

}