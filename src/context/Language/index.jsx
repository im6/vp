import Cookies from 'js-cookie';
import { createContext, useState, useEffect } from 'react';
import { translation as allTranslation } from '../../translation';
import { langSelectionKey } from '../../constant';

export const LanguageContext = createContext();

export const LanguageProvider = ({ initLang, children }) => {
  const [lang, setLang] = useState(initLang);
  useEffect(() => {
    Cookies.set(langSelectionKey, lang, { expires: 180 });
  }, [lang]);

  return (
    <LanguageContext.Provider value={[allTranslation[lang], setLang]}>
      {children}
    </LanguageContext.Provider>
  );
};
