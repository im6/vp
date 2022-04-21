import { render, fireEvent } from 'test-utils';
import Color from '.';
import { fromJS, Map } from 'immutable';
import { translation } from '../../../../../translation/index';
import { selectedColor, colorDefSample } from '../../../../../testing/dataMock';

describe('render properly', () => {
  beforeAll(() => {
    global.scrollTo = jest.fn();
  });

  const liked = Map({ 1: true, 2: true });
  const colorDef = fromJS(colorDefSample);
  const ids = Object.keys(colorDefSample);

  const cb = jest.fn();

  test('render loading', () => {
    const { container } = render(
      <Color
        list={[]}
        liked={liked}
        colorDef={colorDef}
        loading
        vertical
        onLike={cb}
        onCopy={cb}
        onShare={cb}
        onDownload={cb}
      />
    );
    expect(container.querySelector('.spinContainer')).toBeTruthy();
  });
  test('render no data', () => {
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

    expect(getByText(translation.en.noColorsToShow)).toBeTruthy();
  });
  test('click to enter', () => {
    const { container } = render(
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

    fireEvent.click(container.querySelector('ul'));
    expect(cb).not.toBeCalled(); // trigger history hook event
  });
  test('click to like and copy', () => {
    const { container, getByText } = render(
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
    fireEvent.click(container.querySelector('button'));
    fireEvent.click(getByText(selectedColor));
    expect(cb).toHaveBeenCalledTimes(2);
  });
});
