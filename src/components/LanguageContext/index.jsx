import React from 'react';
import { translation } from '../../translation';

const DEFAULTLANG = 'en';

export const LanguageContext = React.createContext();

export const LanguageContextProvider = ({ lang, children }) => {
  const langSet = translation[lang] || translation[DEFAULTLANG];
  return (
    <LanguageContext.Provider value={langSet}>
      {children}
    </LanguageContext.Provider>
  );
};
