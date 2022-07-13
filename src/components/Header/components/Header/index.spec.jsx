import { render, fireEvent } from 'test-utils';
import Header from '.';
import { imgCdnUrl } from '../../../../constant';

describe('render properly', () => {
  beforeAll(() => {
    global.scrollTo = jest.fn();
  });
  test('render Header with anonymouse', () => {
    const likeNum = 2;
    const { getByText, getByTitle, getByLabelText, rerender } = render(
      <Header
        url="/popular"
        detail={null}
        weiboUrl="//www.weibo.com"
        githubUrl="//www.github.com"
        facebookUrl="//www.facebook.com"
        likeNum={likeNum}
        languages={[]}
        onLogout={jest.fn()}
      />
    );
    rerender(
      <Header
        url="/like"
        detail={null}
        weiboUrl="//www.weibo.com"
        githubUrl="//www.github.com"
        facebookUrl="//www.facebook.com"
        likeNum={likeNum}
        languages={[]}
        onLogout={jest.fn()}
      />
    );
    fireEvent.click(getByLabelText('nav menu'));
    fireEvent.click(getByTitle('click to rotate'));
    fireEvent.click(getByText(`Like (${likeNum})`));
    expect(getByText('Login')).toBeTruthy();
  });

  test('render Header with login Status', () => {
    const onLogout = jest.fn();
    const userInfo = {
      name: 'tom',
      img: 'http://www.image.com',
      isAdmin: true,
      likes: ['528', '529'],
      owns: ['12', '13'],
    };
    const { getByText, rerender } = render(
      <Header
        url="/like"
        detail={userInfo}
        weiboUrl="//www.weibo.com"
        githubUrl="//www.github.com"
        facebookUrl="//www.facebook.com"
        likeNum={2}
        languages={[]}
        onLogout={onLogout}
        onChangeCanvasDirection={jest.fn()}
      />
    );
    rerender(
      <Header
        url="/"
        detail={userInfo}
        facebookUrl="//www.facebook.com"
        likeNum={2}
        languages={[]}
        onLogout={onLogout}
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
        detail={userInfo}
        weiboUrl="//www.weibo.com"
        githubUrl="//www.github.com"
        facebookUrl="//www.facebook.com"
        likeNum={2}
        languages={[]}
        onLogout={onLogout}
        onChangeCanvasDirection={jest.fn()}
      />
    );
    expect(getByRole('img').src).toBe(`http:${imgCdnUrl}/icon.png`);
  });
});
