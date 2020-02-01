import React from 'react';
import { render, fireEvent } from 'test-utils';
import Box from '.';
import { fromJS } from 'immutable';

describe('render properly', () => {
  const boxInfo = fromJS({
    id: '1',
    like: 4,
    color: 'e5d12f#e5632f#d71a64#4c286f',
    userid: null,
    username: 'tom',
    createdate: '1522956515000',
  });

  const clickCb = jest.fn();
  const canvasCb = jest.fn();

  test('render properly with click', () => {
    const { container, getByText, rerender } = render(
      <Box
        boxInfo={boxInfo}
        onLikeClick={clickCb}
        onCanvasClick={canvasCb}
        liked
        vertical
        showUsername
      />
    );
    rerender(
      <Box
        boxInfo={boxInfo}
        onLikeClick={clickCb}
        onCanvasClick={canvasCb}
        liked
        vertical={false}
        showUsername
      />
    );

    rerender(
      <Box
        boxInfo={boxInfo}
        onLikeClick={clickCb}
        onCanvasClick={canvasCb}
        liked
        vertical={false}
        showUsername
      />
    );

    fireEvent.click(getByText('Red Heart'));
    fireEvent.click(container.querySelector('ul'));

    expect(clickCb).toBeCalled();
    expect(container.querySelectorAll('li')).toHaveLength(4);
  });
});
