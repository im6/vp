import { memo } from 'react';
import Box from './Box';

const isEqual = (prevProps, nextProps) => {
  const { liked, id, vertical } = prevProps;
  return (
    nextProps.liked === liked &&
    nextProps.id === id &&
    nextProps.vertical === vertical
  );
};

export default memo(Box, isEqual);
