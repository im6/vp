import { takeLatest } from 'redux-saga/effects';
import { call, put, fork } from 'redux-saga/effects';
import requester from '../services/requester';
import { createAction } from 'redux-actions';
import { downloadCanvas } from '../misc/util.js';
import get from 'lodash.get';

const colorql = `query($cate: ColorCategory!) {
  color(category: $cate) {
    id
    like
    color
    userid
    username
    createdate
  }
}`;

function* watchers(a) {
  yield takeLatest("color/get", initColorList);
  yield takeLatest("color/getUserColor", getUserColor);
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
  const cate = action.payload === 'myPortfolio' ? 'PROFILE' : 'LIKES'
  const payload = yield call(requester, '/graphql', {
    query: colorql,
    variables: { cate },
  });
  const gqlRes = get(payload, 'data.color', null)
  if(gqlRes){
    yield put({
      type: "color/getUserColor/success",
      payload: {
        name: action.payload === 'myPortfolio' ? 'myPortfolio' : 'myLiked',
        data: gqlRes
      },
    });
  } else {
    yield put({
      type: "color/getUserColor/fail",
      payload: null,
    });
  }
}

function* initColorList() {
  const payload = yield call(requester, '/graphql', {
    query: colorql,
    variables: { cate: "PUBLIC" }
  });
  const gqlRes = get(payload, 'data.color', null)
  if(gqlRes){
    yield put({
      type: "color/get/success",
      payload: gqlRes
    });
  } else {
    yield put({
      type: "color/get/fail",
      payload: null,
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
