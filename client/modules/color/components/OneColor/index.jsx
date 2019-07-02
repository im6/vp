import React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import style from './style.sass';
import { noop } from '../../../../misc/util';
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
            >
              {language.download}
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
