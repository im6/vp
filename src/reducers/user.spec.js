import { Map, fromJS } from 'immutable';
import userReducer from './user';

describe('test user reducer behavior', () => {
  test('action of user/logoff', () => {
    expect(
      userReducer(new Map({ detail: {}, facebookUrl: 'url' }), {
        type: 'user/logoff',
      })
    ).toEqual(
      Map({
        detail: null,
        facebookUrl: null,
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
      userReducer(new Map({ detail: {}, facebookUrl: 'url' }), {
        type: 'user/auth/success',
        payload: userInfo,
      })
    ).toEqual(
      fromJS({
        detail: userInfo,
        facebookUrl: null,
        loading: false,
      })
    );
  });
  test('action of user/auth/fail', () => {
    const url = 'new url';
    expect(
      userReducer(new Map({ detail: {}, facebookUrl: 'url' }), {
        type: 'user/auth/fail',
        payload: url,
      })
    ).toEqual(
      Map({
        detail: null,
        facebookUrl: url,
        loading: false,
      })
    );
  });
  test('action of user/setLanguage', () => {
    const lang = 'english';
    expect(
      userReducer(new Map({ lang: null }), {
        type: 'user/setLanguage',
        payload: lang,
      })
    ).toEqual(
      Map({
        lang,
      })
    );
  });
});
