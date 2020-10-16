import PropTypes from 'prop-types';
import Heart from './Heart';

const LikeButton = ({ liked, onToggle, likeNum }) => (
  <button
    className="button is-small"
    onClick={onToggle}
    aria-label="click and save"
  >
    <Heart red={liked} />
    &nbsp;&nbsp;
    {likeNum}
  </button>
);

LikeButton.propTypes = {
  likeNum: PropTypes.number.isRequired,
  liked: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
};

export default LikeButton;
