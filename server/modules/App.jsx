
import React from 'react';
import PropTypes from 'prop-types';

import noop from '../../isomorphic/noop';
import ColorLoading from '../../isomorphic/ColorLoading';
import Header from '../../isomorphic/Header'
import { LanguageContext } from '../../isomorphic/LanguageContext';

const App = ({ url }) => <div className='cpk-layout'>
  <Header
    ssr
    url={url}
    onChange={noop}
    onLogout={noop}
    onOAuth={noop}
    onEnterProfile={noop}
    onChangeLang={noop}
  />
  <ColorLoading url={url} />
</div>

App.propTypes = {
  url: PropTypes.string.isRequired,
};
App.contextType = LanguageContext;

export default App;
