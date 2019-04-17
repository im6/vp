import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Color from './components/Color';

const shared = {};
const mapStateToProps = ({ color }, { location: { pathname }, match: { params: { id }}, history }) => {
  const colorDef = color.get('colorDef');
  const liked = color.get('liked');
  shared.history = history;
  const list = color.get(pathname === '/popular' ? 'colorIdByLike' : 'colorId');
  return {
    loading: color.get('loading'),
    list,
    colorDef,
    liked,
    selectedId: id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLike(id, willLike) {
      const ac = createAction('color/toggleLike');
      dispatch(ac({
        willLike,
        id
      }));
    },
    onEnter(color) {
      shared.history.push(`/color/${color.get('id')}`);
    },
    onDownload(color) {
      const ac = createAction('color/download');
      dispatch(ac({
        color: color.get('color'),
        id: color.get('id')
      }));
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Color));
