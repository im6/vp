import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ColorCanvas from '.';

describe('render properly', () => {
  test('render color vertically', () => {
    const { container } = render(
      <ColorCanvas colorValue="acd5d6#ecf1f1#ffffff#c0ccc9" vertical />
    );
    expect(container.querySelectorAll('li')).toHaveLength(4);
  });

  test('handle click', () => {
    const clickHandle = jest.fn();
    const { container } = render(
      <ColorCanvas
        colorValue="acd5d6#ecf1f1#ffffff#c0ccc9"
        onClick={clickHandle}
      />
    );
    fireEvent.click(container.querySelector('li'));
    expect(clickHandle).toBeCalled();
  });
});
