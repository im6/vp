import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import SpinLoader from './SpinLoader';

const ColorLoading = ({ url }) => {
  const showOneColor = url.match(/^\/color\/\d+$/);
  const showColorList =
    showOneColor ||
    url in
      {
        '/latest': true,
        '/': true,
        '/popular': true,
        '/like': true,
        '/portfolio': true,
      };
  return (
    <Fragment>
      <SpinLoader />
      {showColorList && (
        <div className="_10E_t">
          <div className="_1oXEb" />
        </div>
      )}
    </Fragment>
  );
};

ColorLoading.propTypes = {
  url: PropTypes.string.isRequired,
};

export default ColorLoading;
