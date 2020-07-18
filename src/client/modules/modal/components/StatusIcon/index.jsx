import React from 'react';
import PropTypes from 'prop-types';

import InfoIcon from './InfoIcon';
import CheckIcon from './CheckIcon';
import ExclamationIcon from './ExclamationIcon';

const StatusIcon = ({ type }) => {
  let path;
  if (type === 'link' || type === 'info') {
    path = <InfoIcon />;
  } else if (type === 'danger' || type === 'warning') {
    path = <ExclamationIcon />;
  } else if (type === 'primary' || type === 'success') {
    path = <CheckIcon />;
  }
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 1792 1792"
      xmlns="http://www.w3.org/2000/svg"
    >
      {path}
    </svg>
  );
};

StatusIcon.propTypes = {
  type: PropTypes.oneOf([
    'link',
    'info',
    'danger',
    'warning',
    'success',
    'primary',
  ]).isRequired,
};

export default StatusIcon;
