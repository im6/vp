import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import Color from './components/Color';

const shared = {
  history: null,
  isAuth: false,
};

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
  shared.isAuth = isAuth;
  shared.history = history;

  const colorDef = color.get('colorDef');
  const liked = color.get('liked');
  const hasSelected = colorDef.has(selectedId);

  const list =
    pathname === '/like'
      ? liked.keySeq().toArray()
      : color.get(storeMap[pathname] || 'colorIdAllByDate').toJS();

  const loading =
    (isAuth && pathname === '/like') || pathname === '/portfolio'
      ? color.get('loading') || user.get('loading')
      : color.get('loading');

  return {
    loading,
    list,
    colorDef,
    liked,
    selectedId: hasSelected ? selectedId : null,
    vertical: color.get('showVertical'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLike({ id, willLike }) {
      const ac = createAction('color/toggleLike');
      const { isAuth } = shared;
      dispatch(
        ac({
          isAuth, // used client like manager only
          willLike,
          id,
        })
      );
    },
    onEnter(color) {
      window.scrollTo(0, 0);
      shared.history.push(`/color/${color.get('id')}`);
    },
    onDownload(color) {
      const ac = createAction('color/download');
      dispatch(
        ac({
          color: color.get('color'),
          id: color.get('id'),
        })
      );
    },
    onShare(type) {
      const ac = createAction('color/share');
      dispatch(ac(type));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Color);
