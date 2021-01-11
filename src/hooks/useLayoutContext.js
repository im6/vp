import { useContext } from 'react';
import { LayoutContext } from '../context/Layout';

const useLayoutContext = () => useContext(LayoutContext);
export default useLayoutContext;
