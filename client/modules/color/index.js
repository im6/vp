import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Color from './components/Color';

const shared = {};
const storeMap = {
  '/popular': 'colorIdByLike',
  '/': 'colorId',
  '/like': 'myLiked',
  '/portfolio': 'myPortfolio',
};
const mapStateToProps = (
  { color },
  {
    location: { pathname },
    match: {
      params: { id: selectedId },
    },
    history,
  }
) => {
  const colorDef = color.get('colorDef');
  const liked = color.get('liked');
  shared.history = history;
  const list = color.get(storeMap[pathname] || 'colorId');
  return {
    loading: color.get('loading'),
    list,
    colorDef,
    liked,
    selectedId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLike(id, willLike) {
      const ac = createAction('color/toggleLike');
      dispatch(
        ac({
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
    onEnterProfile(name) {
      const ac = createAction('color/getUserColor');
      dispatch(ac(name));
    },
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Color)
);
