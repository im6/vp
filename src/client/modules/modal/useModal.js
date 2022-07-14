import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createAction } from 'redux-actions';

const visibleTimeout = 2000; // same time as $timeout value in style file

const useModal = () => {
  const timeoutRef = useRef();
  const dispatch = useDispatch();
  const state = useSelector(({ modal }) => modal);

  useEffect(
    () => () => {
      clearTimeout(timeoutRef.current);
    },
    []
  );

  useEffect(() => {
    const { type } = state;
    if (type) {
      if (timeoutRef.current) {
        // new content kicks in during old content displaying
      } else {
        timeoutRef.current = setTimeout(() => {
          const ac = createAction('modal/reset');
          dispatch(ac());
        }, visibleTimeout);
      }
    } else if (timeoutRef.current) {
      // handle reset
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  });

  return state;
};

export default useModal;
