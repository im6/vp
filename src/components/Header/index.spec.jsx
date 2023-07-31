import { render, fireEvent } from 'test-utils';
import Header, { mapDispatchToProps } from '.';

describe('render properly', () => {
  test('render LangDropdown correct', () => {
    const { getByTitle, getByText } = render(<Header />);
    fireEvent.click(getByTitle('click to rotate'));
    fireEvent.click(getByText('English'));
    const dispatch = jest.fn();
    const mapper = mapDispatchToProps(dispatch);
    mapper.onLogout();
    expect(dispatch).toBeCalledTimes(1);
  });
});
