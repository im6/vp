import React from 'react';
import { render } from '@testing-library/react';
import ColorBar from '.';

describe('render properly', () => {
  test('render properly with click', () => {
    const { container } = render(
      <ColorBar value="e5d12f#e5632f#d71a64#4c286f" />
    );
    expect(container.querySelectorAll('div')).toHaveLength(5);
  });
});
