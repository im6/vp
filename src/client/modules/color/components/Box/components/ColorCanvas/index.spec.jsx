import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ColorCanvas from '.';

describe('render properly', () => {
  const clickCb = jest.fn();
  test('render color vertically', () => {
    const { container } = render(
      <ColorCanvas
        colorValue="acd5d6#ecf1f1#ffffff#c0ccc9"
        vertical
        onClickText={clickCb}
        onClickCanvas={clickCb}
      />
    );
    expect(container.querySelectorAll('li')).toHaveLength(4);
  });

  test('handle click', () => {
    const clickHandle = jest.fn();
    const { container } = render(
      <ColorCanvas
        colorValue="acd5d6#ecf1f1#ffffff#c0ccc9"
        onClickText={clickCb}
        onClickCanvas={clickHandle}
      />
    );
    fireEvent.click(container.querySelector('li'));
    expect(clickHandle).toBeCalled();
  });
});
