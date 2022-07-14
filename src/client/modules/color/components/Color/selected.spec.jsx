import { render } from 'test-utils';
import Color from '.';
import { colorDefSample } from '../../../../../testing/dataMock';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    id: '1',
  }),
}));

describe('render properly', () => {
  beforeAll(() => {
    global.scrollTo = jest.fn();
  });

  const liked = { 1: true, 2: true };
  const colorDef = colorDefSample;
  const ids = Object.keys(colorDefSample);
  const cb = jest.fn();
  test('render with selected color', () => {
    const { getByText } = render(
      <Color
        list={[...ids, '100']}
        liked={liked}
        colorDef={colorDef}
        vertical
        onLike={cb}
        onCopy={cb}
        onShare={cb}
        onDownload={cb}
      />
    );
    expect(getByText('Download')).toBeTruthy();
  });
});
