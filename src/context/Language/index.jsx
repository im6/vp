import Cookies from 'js-cookie';
import { createContext, useState } from 'react';
import { translation as allTranslation } from '../../translation';
import { langSelectionKey } from '../../constant';

export const LanguageContext = createContext();

export const LanguageProvider = ({ initLang, children }) => {
  const [lang, setLang] = useState(initLang);
  return (
    <LanguageContext.Provider
      value={[
        allTranslation[lang],
        (a) => {
          setLang(a);
          Cookies.set(langSelectionKey, a, { expires: 180 });
        },
      ]}
    >
      {children}
    </LanguageContext.Provider>
  );
};
