import React from 'react';
import { render, fireEvent } from 'test-utils';
import Color from '.';
import { fromJS, Map } from 'immutable';
import { translation } from '../../../../../translation/index';
import { colorDefSample } from '../../../../../testing/dataMock';

describe('render properly', () => {
  beforeAll(() => {
    global.scrollTo = jest.fn();
  });

  const liked = Map({ '1': true, '2': true });
  const colorDef = fromJS(colorDefSample);
  const ids = Object.keys(colorDefSample);

  const cb = jest.fn();

  test('render loading', () => {
    const { container } = render(
      <Color
        list={[]}
        liked={liked}
        colorDef={colorDef}
        selectedId={null}
        loading
        vertical
        onLike={cb}
        onShare={cb}
        onEnter={cb}
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
        selectedId={null}
        vertical
        onLike={cb}
        onShare={cb}
        onEnter={cb}
        onDownload={cb}
      />
    );

    expect(getByText(translation.en.noColorsToShow)).toBeTruthy();
  });
  test('render undefined color id', () => {
    const undefinedId = 798;
    const { getByText } = render(
      <Color
        list={[]}
        liked={liked}
        colorDef={colorDef}
        selectedId={undefinedId}
        vertical
        onLike={cb}
        onShare={cb}
        onEnter={cb}
        onDownload={cb}
      />
    );

    expect(
      getByText(`${translation.en.undefinedColorId} (${undefinedId})`)
    ).toBeTruthy();
  });
  test('render with data', () => {
    const { getByText } = render(
      <Color
        list={[...ids, '100']}
        liked={liked}
        colorDef={colorDef}
        selectedId={ids[0]}
        vertical
        onLike={cb}
        onShare={cb}
        onEnter={cb}
        onDownload={cb}
      />
    );
    expect(getByText('Download')).toBeTruthy();
  });
  test('click to enter', () => {
    const { container } = render(
      <Color
        list={[...ids, '100']}
        liked={liked}
        colorDef={colorDef}
        vertical
        onLike={cb}
        onShare={cb}
        onEnter={cb}
        onDownload={cb}
      />
    );

    fireEvent.click(container.querySelector('ul'));
    expect(cb).toBeCalled();
  });
});
