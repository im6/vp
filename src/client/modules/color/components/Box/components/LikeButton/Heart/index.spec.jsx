import React from 'react';
import { render } from '@testing-library/react';
import Heart from '.';

describe('render properly', () => {
  test('render text correct', () => {
    const { getByText } = render(<Heart />);
    expect(getByText('Grey Heart')).toBeTruthy();
  });
});
