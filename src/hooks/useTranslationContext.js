import { useContext } from 'react';
import { LanguageContext } from '../contexts/Language';

const useTranslationContext = () => useContext(LanguageContext);
export default useTranslationContext;
