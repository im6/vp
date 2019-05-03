import { takeLatest } from 'redux-saga/effects';
import { call, put, fork } from 'redux-saga/effects';
import requester from '../services/requester';
import { createAction } from 'redux-actions';
import { downloadCanvas } from '../misc/util.js';

function* watchers(a) {
  yield takeLatest("color/get", initColorList);
  yield takeLatest("color/getUserColor", getUserColor);
  yield takeLatest("color/loadMore", colorLoadMore);
  yield takeLatest("color/toggleLike", toggleLike);
  yield takeLatest("color/addNew", addNew);
  yield takeLatest('color/download', download);
}

function download(action){
  const downloadUrl = downloadCanvas(action.payload.color);
  const aElem = document.createElement('a');
  aElem.href = downloadUrl;
  aElem.download = `colorpk_${action.payload.id}.png`;
  aElem.click();
  aElem.parentNode && aElem.parentNode.removeChild(elem);
}

function* getUserColor(action) {
  const endpoint = action.payload === 'myPortfolio' ? 'initColorPortfolio' : 'initColorLike';
  const resObj = yield call(requester, `/api/${endpoint}`);
  if(resObj.error){
    yield put({
      type: "color/getUserColor/fail",
      payload: action.payload,
    });
  } else {
    yield put({
      type: "color/getUserColor/success",
      payload: {
        name: action.payload,
        data: resObj.result,
      },
    });
  }
}

function* initColorList() {
  const payload = yield call(requester, '/api/initColorList');
  if(payload.error){
    yield put({
      type: "color/get/fail",
      payload: null,
    });
    console.error('create new color failed! ' + payload.result.code);
  } else {
    yield put({
      type: "color/get/success",
      payload: payload.result
    });
  }
}

function* colorLoadMore() {
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
  yield call(requester, '/api/toggleLike', {
    ...action.payload,
    id: parseInt(action.payload.id),
  });
}

function* addNew(action) {
  const result = yield call(requester, '/api/addNewColor', action.payload);
  const colorinfo = action.payload;
  if(result.error){
    yield put({
      type: "color/addNew/fail",
      payload: null
    });
    console.error('create new color failed! ' + result.result.code);
  } else {
    yield put({
      type: "color/addNew/success",
      payload: {
        ...colorinfo,
        id: result.result.id.toString(),
        name: result.result.name,
        like: 0
      },
    });
  }
}


export default function*(){
  yield fork(watchers);
}