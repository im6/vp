import React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import style from './style.sass';
import noop from '../../../../../isomorphic/noop';
import { LanguageContext } from '../../../../context/LanguageContext';

class OneColor extends React.Component {
  constructor(props) {
    super(props);
    this.onDownload = this.onDownload.bind(this);
  }
  onDownload() {
    this.props.onDownload(this.props.boxInfo);
  }
  render() {
    const { liked, boxInfo, onLike } = this.props;
    const { language } = this.context;
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
            <span
              className="button"
              onClick={() => {
                this.props.onShare('email');
              }}
            >
              {language.email}
            </span>
            <span
              className="button"
              onClick={() => {
                this.props.onShare('facebook');
              }}
            >
              {language.facebook}
            </span>
            <span
              className="button"
              onClick={() => {
                this.props.onShare('twitter');
              }}
            >
              {language.twitter}
            </span>
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
