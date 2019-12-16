import get from 'lodash.get';
import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import requester from '../services/requester';

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
}`;

function* getAnonymousColor() {
  const payload = yield call(requester, '/graphql', {
    query: colorql,
    variables: { cate: 'ANONYMOUS' },
  });
  const gqlRes = get(payload, 'data.color', null);
  if (gqlRes) {
    const successAction = createAction('admin/getList/success');
    yield put(successAction(gqlRes));
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
  const status = get(res, 'data.adjudicateColor.status', 1);
  if (status !== 0) {
    const payload = get(res, 'data.adjudicateColor.data', '');
    const failAction = createAction('admin/decideColor/fail');
    yield put(failAction(payload));
  } else {
    const successAction = createAction('admin/decideColor/success');
    yield put(successAction(action.payload.id));
  }
}

function* watchers() {
  // yield takeLatest('admin/getList', getAnonymousColor);
  // yield takeLatest('admin/decideColor', postDecideColor);
}

export default function*() {
  yield fork(watchers);
}
