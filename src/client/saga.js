import { call, put, takeLatest } from 'redux-saga/effects';

function* mySaga() {
   yield [
      takeLatest("USER_FETCH_REQUESTED", fetchUser),
      takeLatest("USER_FETCH_REQUESTED", fetchUser),
   ];
 }

function* fetchUser(action) {
   try {
      const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

export default mySaga;