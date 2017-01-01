import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import requester from '../services/requester';
import { createAction } from 'redux-actions';

function* watchers(a) {
  yield [
    takeLatest("color/get", initColorList),
    takeLatest("color/loadMore", colorLoadMore),
    takeLatest("color/toggleLike", toggleLike),
    takeLatest("color/addNew", addNew),
  ]
}


function* initColorList(action) {
  try {
    const payload = yield call(requester, '/api/initColorList');
    yield put({
      type: "color/get/success",
      payload: payload.result
    });
  } catch (e) {
    yield put({
      type: "color/get/fail",
      payload: {msg: e}
    });
  }
}

function* colorLoadMore(action) {
  try {
    const payload = yield call(requester, '/api/initColorList');
    yield put({
      type: "color/loadMore/success",
      payload: payload.result
    });
  } catch (e) {
    yield put({
      type: "color/loadMore/fail",
      payload: {msg: e}
    });
  }
}

function* toggleLike(action) {
  try {
    const payload = yield call(requester, '/api/toggleLike', action.payload);
  } catch (e) {
  }
}

function* addNew(action) {
  try {
    const result = yield call(requester, '/api/addNewColor', action.payload);
    let colorinfo = action.payload;
    yield put({
      type: "color/addNew/success",
      payload: {
        ...colorinfo,
        id: result.result.id,
        username: result.result.username
      }
    });
  } catch (e) {
    yield put({
      type: "color/addNew/fail",
      payload: {msg: e}
    });
  }
}


export default function*(){
  yield fork(watchers);

  let actCreater = createAction('color/get');
  yield put(actCreater());

}