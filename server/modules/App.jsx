
import React from 'react';
import PropTypes from 'prop-types';

import noop from '../../isomorphic/noop';
import SpinLoader from '../../isomorphic/SpinLoader';
import Header from '../../isomorphic/Header';
import { LanguageContext } from '../../isomorphic/LanguageContext';

const App = ({ url }) => <div className='cpk-i3de6'>
  <Header
    ssr
    url={url}
    onChange={noop}
    onLogout={noop}
    onOAuth={noop}
    onEnterProfile={noop}
    onChangeLang={noop}
  />
  <SpinLoader />
</div>

App.propTypes = {
  url: PropTypes.string.isRequired,
};
App.contextType = LanguageContext;

export default App;
