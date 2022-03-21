import PropTypes from 'prop-types';
import { createContext, useState, useEffect } from 'react';
import Layout from 'components/Layout';

export const LayoutContext = createContext();

export const LayoutProvider = ({ children, initVertical, onChange }) => {
  const [isVertical, setVertical] = useState(initVertical);
  useEffect(() => {
    onChange(isVertical); // trigger client-only side effect
  }, [isVertical]);

  return (
    <LayoutContext.Provider value={[isVertical, setVertical]}>
      <Layout>{children}</Layout>
    </LayoutContext.Provider>
  );
};

LayoutProvider.propTypes = {
  children: PropTypes.node,
  initVertical: PropTypes.bool,
  onChange: PropTypes.func,
};
