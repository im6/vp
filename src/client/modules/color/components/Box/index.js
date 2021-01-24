import { memo } from 'react';
import Box from './Box';

const isEqual = (prevProps, nextProps) => {
  const { starred, id, vertical } = prevProps;
  return (
    nextProps.starred === starred &&
    nextProps.id === id &&
    nextProps.vertical === vertical
  );
};

export default memo(Box, isEqual);
