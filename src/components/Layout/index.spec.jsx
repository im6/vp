import { render } from 'test-utils';
import Layout from '.';

describe('render properly', () => {
  test('render Layout correct', () => {
    const text = 'hello world';
    const { getByText } = render(
      <Layout>
        <h1>{text}</h1>
      </Layout>
    );
    expect(getByText(text)).toBeTruthy();
  });
});
