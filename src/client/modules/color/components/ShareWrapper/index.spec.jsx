import { render, fireEvent } from 'test-utils';
import ShareWrapper from '.';
import { boxInfo } from '../../../../../testing/dataMock';

describe('render properly', () => {
  const shareCb = jest.fn();
  const downloadCb = jest.fn();

  test('render properly with click', () => {
    const { getByText } = render(
      <ShareWrapper
        id={boxInfo.id}
        value={boxInfo.color}
        onShare={shareCb}
        onDownload={downloadCb}
      >
        <div />
      </ShareWrapper>
    );

    fireEvent.click(getByText('Download'));
    fireEvent.click(getByText('E-Mail'));
    fireEvent.click(getByText('FaceBook'));
    fireEvent.click(getByText('Twitter'));

    expect(shareCb).toBeCalledTimes(3);
    expect(downloadCb).toBeCalledTimes(1);
  });
});
