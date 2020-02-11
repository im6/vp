import { fromJS } from 'immutable';
import colorReducer from './color';

describe('test user reducer behavior', () => {
  const testColor = [
    {
      id: '529',
      like: 2,
      color: '7b7d87#e7e6e1#ffffff#656faf',
      userid: null,
      username: null,
      createdate: '1578156028000',
    },
    {
      id: '528',
      like: 15,
      color: 'acd5d6#ecf1f1#ffffff#c0ccc9',
      userid: null,
      username: null,
      createdate: '1578155992000',
    },
    {
      id: '527',
      like: 19,
      color: 'b87fb1#ffffff#eaecf7#858dbb',
      userid: null,
      username: null,
      createdate: '1578155962000',
    },
  ];
  const colorDef = testColor.reduce((acc, v) => {
    acc[v.id] = v;
    return acc;
  }, {});
  const colorIdAllByDate = ['529', '528', '527'];
  const colorIdAllByLike = ['527', '528', '529'];

  test('action of color/get', () => {
    const newState = colorReducer(fromJS({ loading: false }), {
      type: 'color/get',
    });
    expect(newState.get('loading')).toBeTruthy();
  });

  test('action of color/get/success', () => {
    const newState = colorReducer(fromJS({ loading: true }), {
      type: 'color/get/success',
      payload: testColor,
    });
    expect(
      newState.equals(
        fromJS({
          loading: false,
          colorIdAllByDate,
          colorIdAllByLike,
          colorDef,
        })
      )
    ).toBeTruthy();
  });
  test('action of color/get/fail', () => {
    expect(
      colorReducer(fromJS({ loading: false }), {
        type: 'color/get/fail',
      }).equals(
        fromJS({
          loading: false,
          colorIdAllByDate: [],
          colorIdAllByLike: [],
        })
      )
    ).toBeTruthy();
  });
  test('action of color/toggleLike click like', () => {
    const newState = colorReducer(fromJS({ colorDef }), {
      type: 'color/toggleLike',
      payload: {
        willLike: true,
        id: testColor[0].id,
      },
    });

    expect(newState.getIn(['liked', '527'])).toBeTruthy();
  });

  test('action of color/toggleLike click unlike', () => {
    const newState = colorReducer(fromJS({ colorDef }), {
      type: 'color/toggleLike',
      payload: {
        willLike: false,
        id: testColor[0].id,
      },
    });

    expect(newState.getIn(['liked', '527'])).toBeFalsy();
  });
  test('action of color/addNew/success', () => {
    const newColorId = '1';
    const newState = colorReducer(
      fromJS({ loading: false, colorIdAllByDate, colorIdAllByLike }),
      {
        type: 'color/addNew/success',
        payload: {
          id: newColorId,
          color: 'f1d4d4#ddb6c6#ac8daf#484c7f',
        },
      }
    );
    expect(newState.getIn(['colorIdAllByDate', '0'])).toBe(newColorId);
  });
  test('action of color/set/likes', () => {
    const newLikeId = '528';
    const newState = colorReducer(fromJS({ loading: false }), {
      type: 'color/set/likes',
      payload: [newLikeId],
    });
    expect(newState.getIn(['liked', newLikeId])).toBeTruthy();
  });
  test('action of color/set/owns', () => {
    const ownedIds = [1, 2, 3];
    const newState = colorReducer(fromJS({ loading: false }), {
      type: 'color/set/owns',
      payload: ownedIds,
    });
    expect(newState.get('colorIdByMyOwn').toJS()).toEqual(ownedIds);
  });
  test('action of color/setDirection', () => {
    const isVertical = true;
    const newState = colorReducer(fromJS({ loading: false }), {
      type: 'color/setDirection',
      payload: isVertical,
    });
    expect(newState.get('showVertical')).toBe(isVertical);
  });
});
