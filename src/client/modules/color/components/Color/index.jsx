import { Fragment, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';

import style from './style.sass';
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
  const selectedColor = selectedId && colorDef.get(selectedId);
  const colorNotFound = selectedId && !selectedColor;
  return (
    <Fragment>
      {loading && <SpinLoader />}
      {selectedColor && (
        <ShareWrapper
          id={selectedColor.get('id')}
          value={selectedColor.get('color')}
          onShare={onShare}
          onDownload={onDownload}
        >
          <Box
            vertical={isVertical}
            starred={liked.get(selectedId)}
            id={selectedColor.get('id')}
            username={selectedColor.get('username')}
            starNum={selectedColor.get('star')}
            value={selectedColor.get('color')}
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
          const boxInfo = colorDef.get(v);
          return boxInfo ? (
            <Box
              key={v}
              vertical={isVertical}
              starred={liked.get(v)}
              id={boxInfo.get('id')}
              username={boxInfo.get('username')}
              starNum={boxInfo.get('star')}
              value={boxInfo.get('color')}
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
