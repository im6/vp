import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import Color from './components/Color';

const storeMap = {
  '/': 'colorIdAllByDate',
  '/latest': 'colorIdAllByDate',
  '/popular': 'colorIdAllByLike',
  '/like': false, // convert by dict
  '/portfolio': 'colorIdByMyOwn',
};

const mapStateToProps = (
  { color, user },
  {
    location: { pathname },
    match: {
      params: { id: selectedId },
    },
    history,
  }
) => {
  const isAuth = Boolean(user.get('detail'));

  const colorDef = color.get('colorDef');
  const liked = color.get('liked');

  const list =
    pathname === '/like'
      ? liked.keySeq().toArray()
      : color.get(storeMap[pathname] || 'colorIdAllByDate').toJS();

  const loading =
    (isAuth && pathname === '/like') || pathname === '/portfolio'
      ? color.get('loading') || user.get('loading')
      : color.get('loading');

  return {
    isAuth,
    loading,
    list,
    colorDef,
    liked,
    selectedId,
    vertical: color.get('showVertical'),
    onEnter: history.push,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLike({ id, willLike }, isAuth) {
      const ac = createAction('color/toggleLike');
      dispatch(
        ac({
          isAuth, // used client like manager only
          willLike,
          id,
        })
      );
    },
    onDownload(id, color) {
      const ac = createAction('color/download');
      dispatch(ac({ id, color }));
    },
    onShare(type) {
      const ac = createAction('color/share');
      dispatch(ac(type));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Color);
