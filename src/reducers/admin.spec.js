import { fromJS } from 'immutable';
import adminReducer from './admin';

describe('test user reducer behavior', () => {
  test('action of admin/getList', () => {
    const newState = adminReducer(fromJS({ loading: false }), {
      type: 'admin/getList',
    });
    expect(newState.get('loading')).toBeTruthy();
  });
  test('action of admin/getList/success', () => {
    const list = [{}, {}];
    expect(
      adminReducer(fromJS({ loading: {}, list: null }), {
        type: 'admin/getList/success',
        payload: list,
      }).equals(
        fromJS({
          loading: false,
          list,
        })
      )
    ).toBeTruthy();
  });
  test('action of admin/getList/fail', () => {
    const list = [{}, {}];
    expect(
      adminReducer(fromJS({ loading: {}, list: null }), {
        type: 'admin/getList/fail',
        payload: list,
      }).equals(
        fromJS({
          loading: false,
          list: [],
        })
      )
    ).toBeTruthy();
  });
  test('action of admin/decideColor/success', () => {
    const list = [{ id: 1 }, { id: 2 }];
    const selectedId = list[0].id;
    expect(
      adminReducer(fromJS({ loading: true, list: fromJS(list) }), {
        type: 'admin/decideColor/success',
        payload: selectedId,
      }).equals(
        fromJS({
          loading: false,
          list: list.filter(v => v.id !== selectedId),
        })
      )
    ).toBeTruthy();
  });
});
