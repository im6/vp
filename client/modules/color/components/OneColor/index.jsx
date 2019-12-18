import React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import style from './style.sass';
import noop from '../../../../../isomorphic/noop';
import { LanguageContext } from '../../../../../isomorphic/LanguageContext';

class OneColor extends React.Component {
  constructor(props) {
    super(props);
    this.onDownload = this.onDownload.bind(this);
  }
  onDownload() {
    const { onDownload, boxInfo } = this.props;
    onDownload(boxInfo);
  }
  render() {
    const { liked, boxInfo, onLike, onShare } = this.props;
    const language = this.context;
    return (
      <div className={style.center}>
        <div>
          <Box
            liked={liked}
            boxInfo={boxInfo}
            onLikeClick={onLike}
            onCanvasClick={noop}
            showUsername
          />
          <div className={style.center}>
            <button
              onClick={this.onDownload}
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
  }
}

OneColor.propTypes = {
  liked: PropTypes.bool,
  boxInfo: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
};
OneColor.contextType = LanguageContext;
export default OneColor;
