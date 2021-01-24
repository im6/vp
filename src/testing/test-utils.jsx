import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { LayoutProvider } from '../contexts/Layout/index';
import { LanguageProvider } from '../contexts/Language/index';
import store from './testStore';
import { defaultLanguageKey, canvasDefaultVertical } from '../constant';

jest.mock('../components/Layout/index', () => ({ children }) => (
  <div>{children}</div>
));

const AllTheProviders = ({ children }) => {
  return (
    <MemoryRouter>
      <Provider store={store}>
        <LanguageProvider initLang={defaultLanguageKey} onChange={jest.fn()}>
          <LayoutProvider
            initVertical={canvasDefaultVertical}
            onChange={jest.fn()}
          >
            {children}
          </LayoutProvider>
        </LanguageProvider>
      </Provider>
    </MemoryRouter>
  );
};

AllTheProviders.propTypes = {
  children: PropTypes.element,
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
