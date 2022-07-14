import { render } from 'test-utils';
import Color from '.';
import { translation } from '../../../../../translation/index';
import { colorDefSample } from '../../../../../testing/dataMock';

const undefinedId = '23';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    id: undefinedId,
  }),
}));

describe('render properly', () => {
  beforeAll(() => {
    global.scrollTo = jest.fn();
  });

  const liked = { 1: true, 2: true };
  const colorDef = colorDefSample;
  const cb = jest.fn();
  test('render undefined color id', () => {
    const { getByText } = render(
      <Color
        list={[]}
        liked={liked}
        colorDef={colorDef}
        vertical
        onLike={cb}
        onCopy={cb}
        onShare={cb}
        onDownload={cb}
      />
    );

    expect(
      getByText(`${translation.en.undefinedColorId} (${undefinedId})`)
    ).toBeTruthy();
  });
});
