import get from 'lodash.get';
import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import { downloadCanvas } from '../misc/util.js';
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
  const downloadUrl = downloadCanvas(action.payload.color);
  const aElem = document.createElement('a');
  aElem.href = downloadUrl;
  aElem.download = `colorpk_${action.payload.id}.png`;
  aElem.click();
  if (aElem.parentNode) {
    aElem.parentNode.removeChild(aElem);
  }
}

function share({ payload }) {
  // eslint-disable-next-line no-prototype-builtins
  if (!window.hasOwnProperty('encodeURIComponent')) {
    return;
  }
  const windowSize = 'left=350,top=250,width=500,height=300';
  const subject = window.encodeURIComponent('Check this ColorPK Palette');
  const pageLink = window.encodeURIComponent(window.location.href);

  let url = null;
  switch (payload) {
    case 'twitter':
      url = `https://twitter.com/intent/tweet?url=${pageLink}&text=${subject}`;
      break;
    case 'facebook':
      url = `https://www.facebook.com/sharer/sharer.php?u=${pageLink}&quote=${subject}`;
      break;
    case 'email':
      url = `mailto:?subject=${subject}&body=${pageLink}`;
      break;
    default:
      return;
  }
  window.open(url, '', windowSize);
}

function* getUserColor(action) {
  const cate = action.payload === 'myPortfolio' ? 'PROFILE' : 'LIKES';
  const payload = yield call(requester, '/graphql', {
    query: colorql,
    variables: { cate },
  });

  const data = get(payload, 'data.color', null);
  if (data) {
    yield put({
      type: 'color/getUserColor/success',
      payload: {
        name: action.payload === 'myPortfolio' ? 'myPortfolio' : 'myLiked',
        data,
      },
    });
  } else {
    yield put({
      type: 'color/getUserColor/fail',
      payload: {
        name: action.payload,
      },
    });
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
  const res = yield call(requester, '/graphql', {
    query: likeql,
    variables: {
      val: action.payload,
    },
  });

  if (get(res, 'data.likeColor.status', 1) !== 0) {
    console.error('toggle like error'); // eslint-disable-line no-console
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
    console.error('create new color failed!'); // eslint-disable-line no-console
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
