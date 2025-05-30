import { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as style from './style.sass';
import Box from '../../color/components/Box';
import useLayoutContext from '../../../../hooks/useLayoutContext';

const AdminPanel = ({ loading, list, onAdjudicate, onInitList }) => {
  const [isVertical] = useLayoutContext();

  useEffect(() => {
    if (!list) onInitList();
  }, []);

  const onAdjudicateLocal = (id, willLike) => () => onAdjudicate(id, willLike);

  return (
    <div className={style.container}>
      {!loading &&
        (list && list.length > 0 ? (
          list.map((v) => (
            <div key={v.id}>
              <Box
                value={v.color}
                id={v.id}
                vertical={isVertical}
                starNum={v.star}
                starred={false}
                onClickHeart={onAdjudicateLocal(v.id, true)}
              />
              <br />
              &nbsp;&nbsp;
              <button
                className="button is-danger is-small"
                onClick={onAdjudicateLocal(v.id, false)}
              >
                Delete {v.id}
              </button>
            </div>
          ))
        ) : (
          <h1>No colors to decide.</h1>
        ))}
    </div>
  );
};

AdminPanel.propTypes = {
  list: PropTypes.array,
  loading: PropTypes.bool,
  onInitList: PropTypes.func.isRequired,
  onAdjudicate: PropTypes.func.isRequired,
};

export default AdminPanel;
