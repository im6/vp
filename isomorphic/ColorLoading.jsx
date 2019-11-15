import React from 'react';
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
    <React.Fragment>
      <SpinLoader />
      {showColorList && (
        <div className="_10E_t">
          <div className="_1oXEb" />
        </div>
      )}
    </React.Fragment>
  );
};

export default ColorLoading;
