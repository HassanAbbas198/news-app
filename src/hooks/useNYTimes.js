import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import * as actions from '../store/actions/index';

export const useNYTimes = () => {
  const [page, setPage] = useState(0);
  const [shouldFetch, setShouldFetch] = useState(true);

  const dispatch = useDispatch();

  // return this function for Flatlist to call onEndReached
  const fetchMore = useCallback(() => setShouldFetch(true), []);

  useEffect(() => {
    if (!shouldFetch) {
      return;
    }

    const fetch = async () => {
      await dispatch(actions.fetchArticles(page));

      setShouldFetch(false);
      setPage(page + 1);
    };

    fetch();
  }, [page, shouldFetch]);

  return [fetchMore];
};
