import React from 'react';
import PropTypes from 'prop-types';
import LanguageContext from './index';
import { translation } from '../../translation';

const LanguageProvider = ({ lang, children }) => (
  <LanguageContext.Provider value={translation[lang]}>
    {children}
  </LanguageContext.Provider>
);

LanguageProvider.propTypes = {
  lang: PropTypes.string,
  children: PropTypes.node,
};

export default LanguageProvider;
