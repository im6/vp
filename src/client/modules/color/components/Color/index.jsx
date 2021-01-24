import { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import OneColor from '../OneColor';
import style from './style.sass';
import SpinLoader from 'components/SpinLoader';
import useTranslationContext from '../../../../../hooks/useTranslationContext';
import useLayoutContext from '../../../../../hooks/useLayoutContext';

const Color = ({
  isAuth,
  list,
  liked,
  colorDef,
  selectedId,
  loading,
  onLike,
  onShare,
  onEnter,
  onCopy,
  onDownload,
}) => {
  const [isVertical] = useLayoutContext();
  const [language] = useTranslationContext();
  useEffect(() => {
    /* istanbul ignore next */
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
          starNum={selectedColor.get('star')}
          value={selectedColor.get('color')}
          starred={liked.get(selectedId)}
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
              vertical={isVertical}
              starred={liked.get(v)}
              id={boxInfo.get('id')}
              username={boxInfo.get('username')}
              starNum={boxInfo.get('star')}
              value={boxInfo.get('color')}
              onClickLike={onLikeLocal}
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
