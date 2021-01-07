import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { LayoutProvider } from '../context/Layout/index';
import { LanguageProvider } from '../context/Language/index';
import store from './testStore';
import { defaultLanguageKey, canvasDefaultVertical } from '../constant';

const AllTheProviders = ({ children }) => {
  return (
    <MemoryRouter>
      <Provider store={store}>
        <LanguageProvider initLang={defaultLanguageKey}>
          <LayoutProvider initVertical={canvasDefaultVertical} testOnly>
            {children}
          </LayoutProvider>
        </LanguageProvider>
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
