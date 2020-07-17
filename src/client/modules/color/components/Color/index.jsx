import React, { Fragment, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import OneColor from '../OneColor';
import style from './style.sass';
import SpinLoader from 'components/SpinLoader';
import { LanguageContext } from 'components/LanguageContext';

const Color = ({
  isAuth,
  list,
  liked,
  colorDef,
  selectedId,
  loading,
  vertical,
  onLike,
  onShare,
  onEnter,
  onCopy,
  onDownload,
}) => {
  const language = useContext(LanguageContext);
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  }, [selectedId]);
  const onCanvasClick = (id) => {
    onEnter(`/color/${id}`);
  };
  const onLikeLocal = (a) => {
    onLike(a, isAuth);
  };
  const selectedColor = selectedId && colorDef.get(selectedId);
  const colorNotFound = selectedId && !selectedColor;
  return (
    <Fragment>
      {loading && <SpinLoader />}
      {selectedColor && (
        <OneColor
          id={selectedColor.get('id')}
          username={selectedColor.get('username')}
          likeNum={selectedColor.get('like')}
          value={selectedColor.get('color')}
          liked={liked.get(selectedId)}
          vertical={vertical}
          onCopy={onCopy}
          onLike={onLikeLocal}
          onDownload={onDownload}
          onShare={onShare}
        />
      )}
      <div className={style.text}>
        {!loading && colorNotFound && (
          <h1>
            {language.undefinedColorId} ({selectedId})
          </h1>
        )}
        {!loading && list.length === 0 && <h1>{language.noColorsToShow}</h1>}
      </div>
      <div className={style.list}>
        {list.map((v) => {
          const boxInfo = colorDef.get(v);
          return boxInfo ? (
            <Box
              key={v}
              vertical={vertical}
              liked={liked.get(v)}
              id={boxInfo.get('id')}
              username={boxInfo.get('username')}
              likeNum={boxInfo.get('like')}
              value={boxInfo.get('color')}
              onLikeClick={onLikeLocal}
              onClickText={onCopy}
              onClickCanvas={onCanvasClick}
            />
          ) : null;
        })}
      </div>
    </Fragment>
  );
};

Color.propTypes = {
  isAuth: PropTypes.bool,
  selectedId: PropTypes.string,
  loading: PropTypes.bool,
  vertical: PropTypes.bool,
  liked: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
  colorDef: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default Color;
