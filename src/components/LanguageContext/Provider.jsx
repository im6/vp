import React from 'react';
import PropTypes from 'prop-types';
import LanguageContext from './index';
import { translation } from '../../translation';

const DEFAULTLANG = 'en';

const LanguageProvider = ({ lang, children }) => {
  const langSet = translation[lang] || translation[DEFAULTLANG];
  return (
    <LanguageContext.Provider value={langSet}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  lang: PropTypes.string,
  children: PropTypes.node,
};

export default LanguageProvider;
