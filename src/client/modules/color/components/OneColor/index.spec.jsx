import { render, fireEvent } from 'test-utils';
import Box from '.';
import { boxInfo } from '../../../../../testing/dataMock';

describe('render properly', () => {
  const likeCb = jest.fn();
  const shareCb = jest.fn();
  const downloadCb = jest.fn();

  test('render properly with click', () => {
    const { container, getByText } = render(
      <Box
        id={boxInfo.id}
        username={boxInfo.username}
        value={boxInfo.color}
        starNum={boxInfo.star}
        starred
        onLike={likeCb}
        onCopy={jest.fn()}
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
