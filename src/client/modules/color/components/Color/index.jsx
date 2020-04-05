import React, { Fragment, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import OneColor from '../OneColor';
import style from './style.sass';
import SpinLoader from 'components/SpinLoader';
import { LanguageContext } from 'components/LanguageContext';

const Color = ({
  list,
  liked,
  colorDef,
  selectedId,
  loading,
  vertical,
  onLike,
  onShare,
  onEnter,
  onDownload,
}) => {
  const language = useContext(LanguageContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedId]);
  const onCanvasClick = (color) => {
    onEnter(`/color/${color.get('id')}`);
  };
  return (
    <Fragment>
      {loading && <SpinLoader />}
      {selectedId && (
        <OneColor
          boxInfo={colorDef.get(selectedId)}
          liked={liked.get(selectedId)}
          vertical={vertical}
          onLike={onLike}
          onDownload={onDownload}
          onShare={onShare}
        />
      )}
      <div className={style.list}>
        {!loading && list.length === 0 && <h1>{language.noColorsToShow}</h1>}
        {list.map((v) => {
          const boxInfo = colorDef.get(v);
          return boxInfo ? (
            <Box
              key={v}
              vertical={vertical}
              liked={liked.get(v)}
              boxInfo={boxInfo}
              onLikeClick={onLike}
              onCanvasClick={onCanvasClick}
            />
          ) : null;
        })}
      </div>
    </Fragment>
  );
};

Color.propTypes = {
  selectedId: PropTypes.string,
  loading: PropTypes.bool,
  vertical: PropTypes.bool,
  liked: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
  colorDef: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default Color;
