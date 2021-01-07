import { useContext } from 'react';
import { LayoutContext } from '../context/Layout/index';

const useLayoutContext = () => useContext(LayoutContext);
export default useLayoutContext;
