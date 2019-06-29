import { takeLatest } from 'redux-saga/effects';
import { call, put, fork } from 'redux-saga/effects';
import requester from '../services/requester';
import { createAction } from 'redux-actions';
import get from 'lodash.get';

const query = `query {
  auth {
    url
    authError
    user {
      id
      name
      img
      isadmin
      likes
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
  const error = get(payload, 'data.error');
  if (error) {
    const ac0 = createAction('user/auth/fail');
    yield put(ac0(error));
  } else {
    const resData = get(payload, 'data.auth');

    const ac0 = createAction('user/auth/success');
    yield put(ac0(resData));

    if (resData.user && resData.user.likes && resData.user.likes.length) {
      const ac1 = createAction('color/set/likes');
      yield put(ac1(resData.user.likes));
    }
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

function* watchers(a) {
  yield takeLatest('user/auth', getAuth);
  yield takeLatest('user/logoff', logoff);
  yield takeLatest('user/onOAuth', onOAuth);
}

export default function*() {
  yield fork(watchers);
}
