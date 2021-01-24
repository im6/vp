import PropTypes from 'prop-types';
import Heart from './Heart';

const LikeButton = ({ starred, onToggle, starNum }) => (
  <button
    className="button is-small"
    onClick={onToggle}
    title={starred ? 'Saved' : 'Click to save'}
    aria-label="click and save"
  >
    <Heart red={starred} />
    &nbsp;&nbsp;
    {starNum}
  </button>
);

LikeButton.propTypes = {
  starNum: PropTypes.number.isRequired,
  starred: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
};

export default LikeButton;
