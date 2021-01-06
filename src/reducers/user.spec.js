import { Map, fromJS } from 'immutable';
import userReducer from './user';

describe('test user reducer behavior', () => {
  test('action of user/logoff', () => {
    expect(
      userReducer(new Map({ detail: {} }), {
        type: 'user/logoff',
      })
    ).toEqual(
      Map({
        detail: null,
      })
    );
  });
  test('action of user/auth', () => {
    expect(
      userReducer(new Map({ loading: null }), {
        type: 'user/auth',
      })
    ).toEqual(
      fromJS({
        loading: true,
      })
    );
  });
  test('action of user/auth/success', () => {
    const userInfo = { name: 'tom' };
    expect(
      userReducer(new Map({ detail: {} }), {
        type: 'user/auth/success',
        payload: userInfo,
      })
    ).toEqual(
      fromJS({
        detail: userInfo,
        loading: false,
      })
    );
  });
  test('action of user/auth/fail', () => {
    expect(
      userReducer(new Map({ detail: {}, loading: true }), {
        type: 'user/auth/fail',
      })
    ).toEqual(
      Map({
        detail: null,
        loading: false,
      })
    );
  });
  test('action of user/logoff/success', () => {
    const fbUrl = 'some fb url';
    expect(
      userReducer(new Map({ facebookUrl: null }), {
        type: 'user/logoff/success',
        payload: fbUrl,
      })
    ).toEqual(
      Map({
        facebookUrl: fbUrl,
      })
    );
  });
});
