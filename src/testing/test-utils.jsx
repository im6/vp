import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import LangProvider from '../containers/Lang';
import store from './testStore';

const AllTheProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <LangProvider>{children}</LangProvider>
    </Provider>
  );
};

AllTheProviders.propTypes = {
  children: PropTypes.node,
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
