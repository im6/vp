import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import LangProvider from '../containers/Lang';
import store from './testStore';

const AllTheProviders = ({ children }) => {
  return (
    <MemoryRouter>
      <Provider store={store}>
        <LangProvider>{children}</LangProvider>
      </Provider>
    </MemoryRouter>
  );
};

AllTheProviders.propTypes = {
  children: PropTypes.node,
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
