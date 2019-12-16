import get from 'lodash.get';
import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import { download as downloadUtil, share as shareUtil } from '../misc/util.js';
import likeManager from '../services/likeManager';
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

const likeql = `mutation($val: LikeColorInputType!) {
    likeColor(input: $val) {
      status
    }
  }
`;

const createql = `mutation($val: CreateColorInputType!) {
    createColor(input: $val) {
      data
      status
    }
  }
`;

function download(action) {
  downloadUtil(`colorpk_${action.payload.id}.png`, action.payload.color);
}

function share({ payload }) {
  shareUtil(payload);
}

function* getUserColor(action) {
  const cate = action.payload === 'myPortfolio' ? 'PROFILE' : 'LIKES';
  const payload = yield call(requester, '/graphql', {
    query: colorql,
    variables: { cate },
  });

  const data = get(payload, 'data.color', null);
  if (data) {
    const sucessAction = createAction('color/getUserColor/success');
    yield put(
      sucessAction({
        name: action.payload === 'myPortfolio' ? 'myPortfolio' : 'myLiked',
        data,
      })
    );
  } else {
    const failAction = createAction('color/getUserColor/fail');
    yield put(
      failAction({
        name: action.payload,
      })
    );
  }
}

function* initColorList() {
  const payload = yield call(requester, '/graphql', {
    query: colorql,
    variables: { cate: 'PUBLIC' },
  });
  const gqlRes = get(payload, 'data.color', null);
  if (gqlRes) {
    const sucessAction = createAction('color/get/success');
    yield put(sucessAction(gqlRes));
  } else {
    const failAction = createAction('color/get/fail');
    yield put(failAction());
  }
}

function* toggleLike(action) {
  const { willLike, id, isAuth } = action.payload;
  const res = yield call(requester, '/graphql', {
    query: likeql,
    variables: {
      val: {
        id,
        willLike,
      },
    },
  });

  if (get(res, 'data.likeColor.status', 1) !== 0) {
    console.error('toggle like error'); // eslint-disable-line no-console
  }

  if (!isAuth) {
    if (willLike) {
      likeManager.addLike(parseInt(id, 10));
    } else {
      likeManager.removeLike(parseInt(id, 10));
    }
  }
}

function* addNew(action) {
  const res = yield call(requester, '/graphql', {
    query: createql,
    variables: {
      val: action.payload,
    },
  });

  const status = get(res, 'data.createColor.status', 1);
  if (status !== 0) {
    const failAction = createAction('color/addNew/fail');
    yield put(failAction());
    // eslint-disable-next-line no-alert
    alert('create new color failed!');
  } else {
    const { color } = action.payload;
    const id = get(res, 'data.createColor.data', null);
    const sucessAction = createAction('color/addNew/success');
    yield put(
      sucessAction({
        id: id.toString(),
        color,
        name: '',
        like: 0,
      })
    );
    // eslint-disable-next-line no-alert
    alert('Thank you for new colors');
  }
}

function* watchers() {
  yield takeLatest('color/get', initColorList);
  yield takeLatest('color/getUserColor', getUserColor);
  yield takeLatest('color/toggleLike', toggleLike);
  yield takeLatest('color/addNew', addNew);
  yield takeLatest('color/download', download);
  yield takeLatest('color/share', share);
}

export default function*() {
  yield fork(watchers);
}
