import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { createContext, useState, useEffect } from 'react';
import { canvasOrientationKey } from '../../constant';
import Layout from 'components/Layout';

export const LayoutContext = createContext();

export const LayoutProvider = ({ initVertical, children }) => {
  const [isVertical, setVertical] = useState(initVertical);
  useEffect(() => {
    Cookies.set(canvasOrientationKey, isVertical ? '1' : '0', { expires: 180 });
  }, [isVertical]);

  return (
    <LayoutContext.Provider value={[isVertical, setVertical]}>
      <Layout>{children}</Layout>
    </LayoutContext.Provider>
  );
};

LayoutProvider.propTypes = {
  initVertical: PropTypes.bool,
  children: PropTypes.node,
};
