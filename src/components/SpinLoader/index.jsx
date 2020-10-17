import { memo } from 'react';
import './style.sass';

const SpinLoader = () => (
  <div className="spinContainer">
    <div className="spinLoader" />
  </div>
);
export default memo(SpinLoader);
