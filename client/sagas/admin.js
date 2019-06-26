import { takeLatest } from 'redux-saga/effects';
import { call, put, fork } from 'redux-saga/effects';
import requester from '../services/requester';
import { createAction } from 'redux-actions';
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

const adjudicateql = `mutation($val: LikeColorInputType!) {
  adjudicateColor(input: $val) {
    status
  }
}`

function* watchers() {
  yield takeLatest("admin/getList", getAnonymousColor);
  yield takeLatest("admin/decideColor", postDecideColor);
}

function* getAnonymousColor(action) {
  const payload = yield call(requester, '/graphql', {
    query: colorql,
    variables: { cate: "ANONYMOUS" },
  });
  const gqlRes = get(payload, 'data.color', null)
  if(gqlRes){
    yield put({
      type: 'admin/getList/success',
      payload: gqlRes,
    });
  } else {
    window.location.replace('/');
  }
}

function* postDecideColor(action) {
  const res = yield call(requester, '/graphql', {
    query: adjudicateql,
    variables: {
      val: action.payload,
    },
  });
  const status = get(res, 'data.adjudicateColor.status', 1)
  if(status !== 0) {
    const payload = get(res, 'data.adjudicateColor.data', '');
    yield put({
      type: "admin/decideColor/fail",
      payload,
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
