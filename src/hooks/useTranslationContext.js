import { useContext } from 'react';
import { LanguageContext } from '../context/Language';

const useTranslationContext = () => useContext(LanguageContext);
export default useTranslationContext;
