import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { createContext, useState, useEffect } from 'react';
import { canvasOrientationKey } from '../../constant';
import Layout from 'components/Layout';

export const LayoutContext = createContext();

export const LayoutProvider = ({ initVertical, testOnly, children }) => {
  const [isVertical, setVertical] = useState(initVertical);
  useEffect(() => {
    Cookies.set(canvasOrientationKey, isVertical ? '1' : '0', { expires: 180 });
  }, [isVertical]);

  /* istanbul ignore next */
  const childrenElem = testOnly ? children : <Layout>{children}</Layout>;

  return (
    <LayoutContext.Provider value={[isVertical, setVertical]}>
      {childrenElem}
    </LayoutContext.Provider>
  );
};

LayoutProvider.propTypes = {
  testOnly: PropTypes.bool,
  initVertical: PropTypes.bool,
  children: PropTypes.node,
};
