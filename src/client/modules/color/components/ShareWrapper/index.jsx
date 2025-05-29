import PropTypes from 'prop-types';
import * as style from './style.sass';
import useTranslationContext from '../../../../../hooks/useTranslationContext';

const ShareWrapper = ({ id, value, children, onShare, onDownload }) => {
  const [language] = useTranslationContext();
  return (
    <div className={style.center}>
      <div>
        {children}
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

ShareWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  onShare: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default ShareWrapper;
