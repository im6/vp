import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import Color from './components/Color';

const shared = {
  history: null,
  isAuth: false,
};
const storeMap = {
  '/popular': 'colorIdByLike',
  '/': 'colorId',
  '/like': 'myLiked',
  '/portfolio': 'myPortfolio',
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
  shared.isAuth = Boolean(user.get('detail'));
  shared.history = history;

  const colorDef = color.get('colorDef');
  const liked = color.get('liked');
  const hasSelected = colorDef.has(selectedId);
  const list = color.get(storeMap[pathname] || 'colorId').toJS();

  return {
    loading: color.get('loading'),
    list,
    colorDef,
    liked,
    selectedId,
    hasSelected,
    vertical: color.get('showVertical'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInit(url) {
      if (url === '/portfolio') {
        const ac = createAction('color/getUserColor');
        dispatch(ac('myPortfolio'));
      } else if (url === '/like') {
        const ac = createAction('color/getUserColor');
        dispatch(ac('myLiked'));
      }
    },
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
