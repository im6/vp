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
  const onCanvasClick = (id) => {
    onEnter(`/color/${id}`);
  };
  return (
    <Fragment>
      {loading && <SpinLoader />}
      {selectedId && (
        <OneColor
          id={colorDef.getIn([selectedId, 'id'])}
          username={colorDef.getIn([selectedId, 'username'])}
          likeNum={colorDef.getIn([selectedId, 'like'])}
          value={colorDef.getIn([selectedId, 'color'])}
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
              id={boxInfo.get('id')}
              username={boxInfo.get('username')}
              likeNum={boxInfo.get('like')}
              value={boxInfo.get('color')}
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
