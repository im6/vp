import PropTypes from 'prop-types';
import { createContext, useState, useEffect } from 'react';
import { translation as allTranslation } from '../../translation';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children, initLang, onChange }) => {
  const [lang, setLang] = useState(initLang);
  useEffect(() => {
    onChange(lang); // trigger client-only side effect
  }, [lang]);

  return (
    <LanguageContext.Provider value={[allTranslation[lang], setLang]}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.element.isRequired,
  initLang: PropTypes.string,
  onChange: PropTypes.func,
};
