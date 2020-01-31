import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import style from './style.sass';
import { LanguageContext } from 'components/LanguageContext';

const OneColor = ({ liked, boxInfo, onLike, onShare, onDownload }) => {
  const language = useContext(LanguageContext);
  const [isVertical, setVertical] = useState(false);
  return (
    <div className={style.center}>
      <div>
        <Box
          vertical={isVertical}
          liked={liked}
          boxInfo={boxInfo}
          onLikeClick={onLike}
          onCanvasClick={() => {
            setVertical(!isVertical);
          }}
          showUsername
        />
        <div className={style.center}>
          <button
            onClick={() => onDownload(boxInfo)}
            className="button is-fullwidth is-info"
            aria-label={language.download}
          >
            {language.download}
          </button>
        </div>
        <div className={`buttons has-addons is-centered ${style.shareGroup}`}>
          <button
            className="button"
            title={language.email}
            onClick={() => {
              onShare('email');
            }}
          >
            {language.email}
          </button>
          <button
            className="button"
            title={language.facebook}
            onClick={() => {
              onShare('facebook');
            }}
          >
            {language.facebook}
          </button>
          <button
            className="button"
            title={language.twitter}
            onClick={() => {
              onShare('twitter');
            }}
          >
            {language.twitter}
          </button>
        </div>
      </div>
    </div>
  );
};

OneColor.propTypes = {
  liked: PropTypes.bool,
  boxInfo: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default OneColor;
