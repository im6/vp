import { memo } from 'react';
import PropTypes from 'prop-types';
import * as style from './style.sass';

const Heart = ({ red }) => (
  <svg
    height="15"
    width="15"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
    className={style.noTooltip}
  >
    <title>{red ? 'Red Heart' : 'Grey Heart'}</title>
    <path
      className={red ? style.red : style.grey}
      d="M4.95,26A13.46,13.46,0,0,1,24,6.94,13.46,13.46,0,0,1,43.05,26L24,45Z"
    />
  </svg>
);

Heart.propTypes = {
  red: PropTypes.bool,
};

export default memo(Heart);
