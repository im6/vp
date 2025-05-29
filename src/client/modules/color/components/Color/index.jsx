import { Fragment, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';

import * as style from './style.sass';
import SpinLoader from 'components/SpinLoader';
import Box from '../Box';
import ShareWrapper from '../ShareWrapper';
import useTranslationContext from '../../../../../hooks/useTranslationContext';
import useLayoutContext from '../../../../../hooks/useLayoutContext';

const Color = ({
  isAuth,
  list,
  liked,
  colorDef,
  loading,
  onLike,
  onShare,
  onCopy,
  onDownload,
}) => {
  const navigate = useNavigate();
  const { id: selectedId } = useParams();
  const [isVertical] = useLayoutContext();
  const [language] = useTranslationContext();
  useEffect(() => {
    /* istanbul ignore next */
    const ref = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
    return () => {
      clearTimeout(ref);
    };
  }, [selectedId]);
  const onCanvasClick = useCallback((id) => {
    navigate(`/color/${id}`);
  }, []);
  const onLikeLocal = useCallback((a) => {
    onLike(a, isAuth);
  }, []);
  const selectedColor = selectedId && colorDef[selectedId];
  const colorNotFound = selectedId && !selectedColor;
  return (
    <Fragment>
      {loading && <SpinLoader />}
      {selectedColor && (
        <ShareWrapper
          id={selectedColor.id}
          value={selectedColor.color}
          onShare={onShare}
          onDownload={onDownload}
        >
          <Box
            vertical={isVertical}
            starred={liked[selectedId]}
            id={selectedColor.id}
            username={selectedColor.username}
            starNum={selectedColor.star}
            value={selectedColor.color}
            onClickHeart={onLikeLocal}
            onClickText={onCopy}
            showUsername
          />
        </ShareWrapper>
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
          const boxInfo = colorDef[v];
          return boxInfo ? (
            <Box
              key={v}
              vertical={isVertical}
              starred={liked[v]}
              id={boxInfo.id}
              username={boxInfo.username}
              starNum={boxInfo.star}
              value={boxInfo.color}
              onClickHeart={onLikeLocal}
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
  loading: PropTypes.bool,
  liked: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
  colorDef: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default Color;
