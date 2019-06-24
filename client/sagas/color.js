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

const likeql = `mutation($val: LikeColorInputType!) {
    likeColor(input: $val) {
      data
      error
    }
  }
`;

const createql = `mutation($val: CreateColorInputType!) {
    createColor(input: $val) {
      data
      error
    }
  }
`

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
  
  const { errors } = payload;
  if(errors){
    yield put({
      type: "color/getUserColor/fail",
      payload: {
        name: action.payload,
      },
    });
  } else {
    const data = get(payload, 'data.color', []);
    yield put({
      type: "color/getUserColor/success",
      payload: {
        name: action.payload === 'myPortfolio' ? 'myPortfolio' : 'myLiked',
        data,
      },
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
  const res = yield call(requester, '/graphql', {
    query: likeql,
    variables: {
      val: action.payload
    }
  });

  if(get(res, 'data.likeColor.error', false)) {
    console.error(get(res, 'data.likeColor.data'));
  }
}

function* addNew(action) {
  const res = yield call(requester, '/graphql', {
    query: createql,
    variables: {
      val: action.payload,
    },
  });
  
  const error = get(res, 'data. createColor.error');

  if(error){
    yield put({
      type: "color/addNew/fail",
      payload: null
    });
    console.error('create new color failed!');
  } else {
    const { color } = action.payload;
    const id = get(res, 'data.createColor.data', null);

    yield put({
      type: "color/addNew/success",
      payload: {
        id: id.toString(),
        color,
        name: '',
        like: 0,
      },
    });
  }
}

export default function*(){
  yield fork(watchers);
}
