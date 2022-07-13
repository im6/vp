import userReducer from './user';

describe('test user reducer behavior', () => {
  test('action of user/logoff', () => {
    expect(
      userReducer(
        { detail: {} },
        {
          type: 'user/logoff',
        }
      )
    ).toEqual({
      detail: null,
    });
  });
  test('action of user/auth', () => {
    expect(
      userReducer(
        { loading: null },
        {
          type: 'user/auth',
        }
      )
    ).toEqual({
      loading: true,
    });
  });
  test('action of user/auth/success', () => {
    const userInfo = { name: 'tom' };
    expect(
      userReducer(
        { detail: {} },
        {
          type: 'user/auth/success',
          payload: userInfo,
        }
      )
    ).toEqual({
      detail: userInfo,
      loading: false,
    });
  });
  test('action of user/auth/fail', () => {
    expect(
      userReducer(
        { detail: {}, loading: true },
        {
          type: 'user/auth/fail',
        }
      )
    ).toEqual({
      detail: null,
      loading: false,
    });
  });
  test('action of user/logoff/success', () => {
    const facebookUrl = 'some fb url';
    const weiboUrl = 'some wb url';
    const githubUrl = 'some gh url';
    const newUrlMap = {
      facebookUrl,
      weiboUrl,
      githubUrl,
    };
    expect(
      userReducer(
        { facebookUrl: null },
        {
          type: 'user/logoff/success',
          payload: newUrlMap,
        }
      )
    ).toEqual({
      detail: null,
      ...newUrlMap,
    });
  });
});
