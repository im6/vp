import { render, fireEvent } from '@testing-library/react';
import HeartButton from '.';

describe('render properly', () => {
  test('render color correct', () => {
    const clickFn = jest.fn();
    const { container, rerender } = render(
      <HeartButton starNum={2} starred={false} onToggle={clickFn} />
    );
    rerender(<HeartButton starNum={2} starred onToggle={clickFn} />);
    fireEvent.click(container.querySelector('button'));
    expect(clickFn).toBeCalled();
  });
});
