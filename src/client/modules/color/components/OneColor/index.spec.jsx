import React from 'react';
import { render, fireEvent } from 'test-utils';
import Box from '.';
import { fromJS } from 'immutable';

describe('render properly', () => {
  const boxInfo = fromJS({
    id: '1',
    like: 4,
    color: 'e5d12f#e5632f#d71a64#4c286f',
    userid: null,
    username: 'tom',
    createdate: '1522956515000',
  });

  const likeCb = jest.fn();
  const shareCb = jest.fn();
  const downloadCb = jest.fn();

  test('render properly with click', () => {
    const { container, getByText } = render(
      <Box
        liked
        boxInfo={boxInfo}
        onLike={likeCb}
        onShare={shareCb}
        onDownload={downloadCb}
      />
    );

    fireEvent.click(getByText('Red Heart'));
    fireEvent.click(getByText('Download'));
    fireEvent.click(getByText('E-Mail'));
    fireEvent.click(getByText('FaceBook'));
    fireEvent.click(getByText('Twitter'));
    fireEvent.click(container.querySelector('ul'));

    expect(likeCb).toBeCalled();
    expect(shareCb).toBeCalled();
    expect(downloadCb).toBeCalled();
  });
});
