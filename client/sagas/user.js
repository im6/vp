import get from 'lodash.get';
import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { createAction } from 'redux-actions';

import requester from '../services/requester';

const query = `query {
  auth {
    ... on User {
      id
      name
      img
      isadmin
      likes
    }
    ... on AuthFailResponse {
      url
      error
    }
  }
}`;

const logoffQl = `mutation {
  logoff {
    url
  }
}`;

function* getAuth() {
  const payload = yield call(requester, '/graphql', { query });
  // eslint-disable-next-line no-prototype-builtins
  const good = payload.data.auth.hasOwnProperty('id');

  if (good) {
    const userData = get(payload, 'data.auth');
    const ac0 = createAction('user/auth/success');
    yield put(ac0(userData));
    if (userData.likes && userData.likes.length) {
      const ac1 = createAction('color/set/likes');
      yield put(ac1(userData.likes));
    }
  } else {
    const ac0 = createAction('user/auth/fail');
    yield put(ac0(get(payload, 'data.auth.url')));
  }
}

function* logoff() {
  const res = yield call(requester, '/graphql', { query: logoffQl });
  const payload = get(res, 'data.logoff.url', null);
  const ac = createAction('user/logoff/success');
  yield put(ac(payload));
}

function onOAuth(action) {
  window.location.replace(action.payload);
}

function* watchers() {
  yield takeLatest('user/auth', getAuth);
  yield takeLatest('user/logoff', logoff);
  yield takeLatest('user/onOAuth', onOAuth);
}

export default function*() {
  yield fork(watchers);
}
