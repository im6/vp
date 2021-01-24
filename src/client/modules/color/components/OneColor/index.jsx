import PropTypes from 'prop-types';
import Box from '../Box';
import style from './style.sass';
import useLayoutContext from '../../../../../hooks/useLayoutContext';
import useTranslationContext from '../../../../../hooks/useTranslationContext';

const OneColor = ({
  liked,
  id,
  value,
  starNum,
  username,
  onLike,
  onCopy,
  onShare,
  onDownload,
}) => {
  const [isVertical] = useLayoutContext();
  const [language] = useTranslationContext();
  return (
    <div className={style.center}>
      <div>
        <Box
          vertical={isVertical}
          liked={liked}
          id={id}
          username={username}
          starNum={starNum}
          value={value}
          onClickLike={onLike}
          onClickText={onCopy}
          showUsername
        />
        <div className={style.center}>
          <button
            onClick={() => onDownload(id, value)}
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
  id: PropTypes.string.isRequired,
  username: PropTypes.string,
  starNum: PropTypes.number,
  value: PropTypes.string.isRequired,
  onLike: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default OneColor;
