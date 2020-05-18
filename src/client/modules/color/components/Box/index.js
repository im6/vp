import { memo } from 'react';
import Box from './Box';

const isEqual = (prevProps, nextProps) => {
  const { liked, boxInfo, vertical } = prevProps;
  return (
    nextProps.liked === liked &&
    nextProps.boxInfo.get('id') === boxInfo.get('id') &&
    nextProps.vertical === vertical
  );
};

export default memo(Box, isEqual);
