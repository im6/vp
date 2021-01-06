import { useContext } from 'react';
import { LanguageContext } from '../context/Language/index';

const useTranslationContext = () => useContext(LanguageContext);
export default useTranslationContext;
