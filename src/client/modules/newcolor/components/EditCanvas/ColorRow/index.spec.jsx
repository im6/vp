import { render } from '@testing-library/react';
import ColorRow from '.';

describe('render properly', () => {
  const cb = jest.fn();
  test('render color correct', () => {
    const { rerender, container } = render(
      <ColorRow onRowClick={cb} colorValue="#aaffee" />
    );
    rerender(<ColorRow onRowClick={cb} isActive />);
    expect(
      container.querySelector('div > div').style.backgroundColor
    ).toBeFalsy();
  });

  test('shouldComponentUpdate', () => {
    const { rerender, container } = render(
      <ColorRow onRowClick={cb} colorValue="#" />
    );
    rerender(<ColorRow onRowClick={cb} colorValue="#000001" />);
    rerender(<ColorRow onRowClick={cb} colorValue="#000001" isActive />);
    expect(container.querySelector('div > div').style.backgroundColor).toBe(
      'rgb(0, 0, 1)'
    );
  });
});
