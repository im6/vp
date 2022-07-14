import colorReducer from './color';

describe('test user reducer behavior', () => {
  const testColor = [
    {
      id: '529',
      star: 2,
      color: '7b7d87#e7e6e1#ffffff#656faf',
      userId: null,
      username: null,
      createdDate: '1578156028000',
    },
    {
      id: '528',
      star: 15,
      color: 'acd5d6#ecf1f1#ffffff#c0ccc9',
      userId: null,
      username: null,
      createdDate: '1578155992000',
    },
    {
      id: '527',
      star: 19,
      color: 'b87fb1#ffffff#eaecf7#858dbb',
      userId: null,
      username: null,
      createdDate: '1578155962000',
    },
  ];
  const colorDef = testColor.reduce((acc, v) => {
    acc[v.id] = v;
    return acc;
  }, {});
  const colorIdAllByDate = ['529', '528', '527'];
  const colorIdAllByStar = ['527', '528', '529'];

  test('action of color/get', () => {
    const newState = colorReducer(
      { loading: false },
      {
        type: 'color/get',
      }
    );
    expect(newState.loading).toBeTruthy();
  });

  test('action of color/get/success', () => {
    const newState = colorReducer(
      { loading: true },
      {
        type: 'color/get/success',
        payload: testColor,
      }
    );
    expect(newState).toEqual({
      loading: false,
      colorIdAllByDate,
      colorIdAllByStar,
      colorDef,
    });
  });
  test('action of color/get/fail', () => {
    expect(
      colorReducer(
        { loading: false },
        {
          type: 'color/get/fail',
        }
      )
    ).toEqual({
      loading: false,
      colorIdAllByDate: [],
      colorIdAllByStar: [],
    });
  });
  test('action of color/toggleLike click like', () => {
    const liked = {};
    const newState = colorReducer(
      { colorDef, liked },
      {
        type: 'color/toggleLike',
        payload: {
          willLike: true,
          id: testColor[0].id,
        },
      }
    );

    expect(newState.liked['527']).toBeTruthy();
  });

  test('action of color/toggleLike click unlike', () => {
    const liked = { 527: true };
    const newState = colorReducer(
      { colorDef, liked },
      {
        type: 'color/toggleLike',
        payload: {
          willLike: false,
          id: testColor[0].id,
        },
      }
    );

    expect(newState.liked['527']).toBeFalsy();
  });
  test('action of color/addNew/success', () => {
    const newColorId = '1';
    const newState = colorReducer(
      { loading: false, colorIdAllByDate, colorIdAllByStar, colorDef },
      {
        type: 'color/addNew/success',
        payload: {
          id: newColorId,
          color: 'f1d4d4#ddb6c6#ac8daf#484c7f',
        },
      }
    );
    expect(newState.colorIdAllByDate[0]).toBe(newColorId);
  });
  test('action of color/set/likes', () => {
    const newLikeId = '528';
    const newState = colorReducer(
      { loading: false },
      {
        type: 'color/set/likes',
        payload: [newLikeId],
      }
    );
    expect(newState.liked[newLikeId]).toBeTruthy();
  });
  test('action of color/set/owns', () => {
    const ownedIds = [1, 2, 3];
    const newState = colorReducer(
      { loading: false },
      {
        type: 'color/set/owns',
        payload: ownedIds,
      }
    );
    expect(newState.colorIdByMyOwn).toEqual(ownedIds);
  });
});
