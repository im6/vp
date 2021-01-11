import { useContext } from 'react';
import { LayoutContext } from '../contexts/Layout';

const useLayoutContext = () => useContext(LayoutContext);
export default useLayoutContext;
