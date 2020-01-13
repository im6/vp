import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ColorRow from '.';

describe('render properly', () => {
  test('render color correct', () => {
    const color = '#c0ccc9';
    const { getByText } = render(<ColorRow color={color} />);
    fireEvent.click(getByText(color));
    expect(getByText(color)).toBeTruthy();
  });
});
