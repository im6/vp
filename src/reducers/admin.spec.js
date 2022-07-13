import adminReducer from './admin';

describe('test user reducer behavior', () => {
  test('action of admin/getList', () => {
    const newState = adminReducer(
      { loading: false },
      {
        type: 'admin/getList',
      }
    );
    expect(newState.loading).toBeTruthy();
  });
  test('action of admin/getList/success', () => {
    const list = [{}, {}];
    expect(
      adminReducer(
        { loading: true, list: null },
        {
          type: 'admin/getList/success',
          payload: list,
        }
      )
    ).toEqual({
      loading: false,
      list,
    });
  });
  test('action of admin/getList/fail', () => {
    const list = [{}, {}];
    expect(
      adminReducer(
        { loading: {}, list: null },
        {
          type: 'admin/getList/fail',
          payload: list,
        }
      )
    ).toEqual({
      loading: false,
      list: [],
    });
  });
  test('action of admin/decideColor', () => {
    const list = [{ id: 1 }, { id: 2 }];
    const selectedId = list[0].id;
    expect(
      adminReducer(
        { list },
        {
          type: 'admin/decideColor',
          payload: { id: selectedId },
        }
      )
    ).toEqual({
      list: list.filter((v) => v.id !== selectedId),
    });
  });
});
