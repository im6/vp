import React from 'react';
import { render } from 'test-utils';
import Modal from './Modal';

describe('render properly', () => {
  test('render visible', () => {
    const msg = 'hello';
    const { getByText, rerender } = render(<Modal type="primary" />);
    rerender(<Modal message={msg} type="primary" />);
    expect(getByText(msg)).toBeTruthy();
  });
});
