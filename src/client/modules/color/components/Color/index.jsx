import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import OneColor from '../OneColor';
import style from './style.sass';
import SpinLoader from 'components/SpinLoader';

const Color = ({
  list,
  liked,
  colorDef,
  hasSelected,
  selectedId,
  loading,
  vertical,
  onLike,
  onShare,
  onEnter,
  onDownload,
}) => (
  <Fragment>
    {loading && <SpinLoader />}
    {hasSelected && (
      <OneColor
        boxInfo={colorDef.get(selectedId)}
        liked={liked.get(selectedId)}
        onLike={onLike}
        onDownload={onDownload}
        onShare={onShare}
      />
    )}
    <div className={style.container}>
      <div className={style.list}>
        {!loading && list.length === 0 && <h1>No colors to show</h1>}
        {list.map(v => {
          return (
            <Box
              key={v}
              vertical={vertical}
              liked={liked.get(v)}
              boxInfo={colorDef.get(v)}
              onLikeClick={onLike}
              onCanvasClick={onEnter}
            />
          );
        })}
      </div>
    </div>
  </Fragment>
);

Color.propTypes = {
  selectedId: PropTypes.string,
  loading: PropTypes.bool,
  vertical: PropTypes.bool,
  hasSelected: PropTypes.bool,
  liked: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  colorDef: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default Color;
