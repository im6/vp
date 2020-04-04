import React from 'react';
import { render, fireEvent } from 'test-utils';
import { fromJS } from 'immutable';
import Header from '.';
import { cdnUrl } from '../../constant';

describe('render properly', () => {
  beforeAll(() => {
    global.scrollTo = jest.fn();
  });
  test('render Header with anonymouse', () => {
    const onLogin = jest.fn();
    const onRotate = jest.fn();
    const likeNum = 2;
    const { getByText, getByTitle, getByLabelText, rerender } = render(
      <Header
        url="/popular"
        detail={null}
        facebookUrl="//www.facebook.com"
        likeNum={likeNum}
        showVertical
        languages={[]}
        onLogout={jest.fn()}
        onOAuth={onLogin}
        onChangeLang={jest.fn()}
        onChangeCanvasDirection={onRotate}
      />
    );
    rerender(
      <Header
        url="/like"
        detail={null}
        facebookUrl="//www.facebook.com"
        likeNum={likeNum}
        showVertical
        languages={[]}
        onLogout={jest.fn()}
        onOAuth={onLogin}
        onChangeLang={jest.fn()}
        onChangeCanvasDirection={onRotate}
      />
    );
    fireEvent.click(getByText('Facebook Login'));
    fireEvent.click(getByLabelText('nav menu'));
    fireEvent.click(getByTitle('click to rotate'));
    fireEvent.click(getByText(`Like (${likeNum})`));
    expect(onLogin).toBeCalled();
  });

  test('render Header with login Status', () => {
    const onLogout = jest.fn();
    const userInfo = {
      name: 'tom',
      img: 'http://www.image.com',
      isadmin: true,
      likes: ['528', '529'],
      owns: ['12', '13'],
    };
    const { getByText, rerender } = render(
      <Header
        url="/like"
        detail={fromJS(userInfo)}
        facebookUrl="//www.facebook.com"
        likeNum={2}
        showVertical
        languages={[]}
        onLogout={onLogout}
        onOAuth={jest.fn()}
        onChangeLang={jest.fn()}
        onChangeCanvasDirection={jest.fn()}
      />
    );
    rerender(
      <Header
        url="/"
        detail={fromJS(userInfo)}
        facebookUrl="//www.facebook.com"
        likeNum={2}
        showVertical
        languages={[]}
        onLogout={onLogout}
        onOAuth={jest.fn()}
        onChangeLang={jest.fn()}
        onChangeCanvasDirection={jest.fn()}
      />
    );
    fireEvent.click(getByText('Popular'));
    fireEvent.click(getByText('Profile'));
    fireEvent.click(getByText('Like'));
    fireEvent.click(getByText('Log Out'));
    expect(onLogout).toBeCalled();
  });

  test('render Header with login with no image url', () => {
    const onLogout = jest.fn();
    const userInfo = {
      name: 'tom',
      img: null,
      likes: ['528', '529'],
      owns: ['12', '13'],
    };
    const { getByRole } = render(
      <Header
        url="/like"
        detail={fromJS(userInfo)}
        facebookUrl="//www.facebook.com"
        likeNum={2}
        languages={[]}
        onLogout={onLogout}
        onOAuth={jest.fn()}
        onChangeLang={jest.fn()}
        onChangeCanvasDirection={jest.fn()}
      />
    );
    expect(getByRole('img').src).toBe(`http:${cdnUrl}/icon.png`);
  });
});
