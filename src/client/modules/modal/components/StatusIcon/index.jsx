import React from 'react';
import PropTypes from 'prop-types';

import InfoIcon from './InfoIcon';
import CheckIcon from './CheckIcon';
import ExclamationIcon from './ExclamationIcon';

const StatusIcon = ({ type }) => {
  let icon;
  if (type === 'link' || type === 'info') {
    icon = <InfoIcon />;
  } else if (type === 'danger' || type === 'warning') {
    icon = <ExclamationIcon />;
  } else if (type === 'primary' || type === 'success') {
    icon = <CheckIcon />;
  }
  return icon;
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
