import { render } from 'test-utils';
import Lang from '.';

describe('render properly', () => {
  test('render Lang Provider markup', () => {
    const { container } = render(<Lang />);
    expect(container.tagName).toBe('DIV');
  });
});
