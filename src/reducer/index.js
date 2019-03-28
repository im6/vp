import { handleActions } from 'redux-actions';

const dummy = [
  {
    "id": 475,
    "like": 8,
    "color": "e8e2db#fab95b#f5564e#1a3263",
    "userid": null,
    "username": "",
    "colortype": null,
    "display": 0,
    "createdate": "2019-03-05T06:40:35.379Z",
    "liked": 0
  },
  {
    "id": 473,
    "like": 21,
    "color": "64638f#9795cf#aba9e9#cbc9ff",
    "userid": null,
    "username": null,
    "colortype": null,
    "display": 0,
    "createdate": "2019-01-21T01:57:21.574Z",
    "liked": 0
  },
  {
    "id": 472,
    "like": 11,
    "color": "fcf5ee#fbe8e7#f7ddde#ffc4d0",
    "userid": null,
    "username": null,
    "colortype": null,
    "display": 0,
    "createdate": "2019-01-21T01:57:08.932Z",
    "liked": 0
  }
]

const defaultState = {
  user: null,
  colors: dummy,
  likes: {},
};

const reducer = handleActions(
  {
    ['color/like']: (state, action) => {
      console.log(action.payload);
      return state;
    }
  },
  defaultState,
);

export default reducer;