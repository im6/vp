import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import Color from './components/Color';

const mapStateToProps = ({ color, user }, { source }) => {
  const isAuth = Boolean(user.detail);
  const { colorDef, liked } = color;

  const list = source === 'saved' ? Object.keys(liked) : color[source];

  const loading =
    (isAuth && source === 'saved') || source === 'colorIdByMyOwn'
      ? color.loading || user.loading
      : color.loading;

  return {
    isAuth,
    loading,
    list,
    colorDef,
    liked,
  };
};

const mapDispatchToProps = (dispatch) => ({
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

    const ac1 = createAction('modal/color/download');
    dispatch(ac1());
  },
  onShare(type) {
    const ac = createAction('color/share');
    dispatch(ac(type));
  },
  onCopy(txt) {
    const ac = createAction('color/copy');
    dispatch(ac(txt));

    const ac1 = createAction('modal/color/copy');
    dispatch(ac1());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Color);
