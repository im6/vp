import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './style.sass';
import ColorBar from '../ColorBar';

const AdminPanel = ({ loading, list, onAdjudicate, onInit }) => {
  useEffect(() => {
    onInit();
  }, []);
  const colors = list.toJS();
  const onAdjudicateLocal = (id, willLike) => () => onAdjudicate(id, willLike);
  return (
    <div className={style.container}>
      <br />
      <br />
      <br />
      {!loading && colors.length === 0 && <h1>No colors to decide.</h1>}
      {colors.map((v) => {
        return (
          <div key={v.id} className={style.oneRow}>
            <ColorBar value={v.color} />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button
              className="button is-success is-small"
              onClick={onAdjudicateLocal(v.id, true)}
            >
              Approve
            </button>
            &nbsp;&nbsp;
            <button
              className="button is-danger is-small"
              onClick={onAdjudicateLocal(v.id, false)}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

AdminPanel.propTypes = {
  list: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  onInit: PropTypes.func.isRequired,
  onAdjudicate: PropTypes.func.isRequired,
};

export default AdminPanel;
