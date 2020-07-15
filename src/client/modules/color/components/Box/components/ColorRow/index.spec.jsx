import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ColorRow from '.';

describe('render properly', () => {
  const clickCb = jest.fn();
  test('render color correct', () => {
    const color = '#c0ccc9';
    const { getByText } = render(
      <ColorRow color={color} onClickText={clickCb} />
    );
    fireEvent.click(getByText(color));
    expect(getByText(color)).toBeTruthy();
  });
});
