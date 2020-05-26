import { memo } from 'react';
import ColorRow from './ColorRow';

const isEqual = (prevProps, nextProps) => {
  const isSame =
    nextProps.colorValue == prevProps.colorValue &&
    nextProps.isActive == prevProps.isActive;
  return isSame;
};

export default memo(ColorRow, isEqual);
