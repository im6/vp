import PropTypes from 'prop-types';
import Heart from './Heart';

const HeartButton = ({ starred, onClick, starNum }) => (
  <button
    className="button is-small"
    onClick={onClick}
    title={starred ? 'Saved' : 'Click to save'}
    aria-label="click and save"
  >
    <Heart red={starred} />
    &nbsp;&nbsp;
    {starNum}
  </button>
);

HeartButton.propTypes = {
  starNum: PropTypes.number.isRequired,
  starred: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default HeartButton;
