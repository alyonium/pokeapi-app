import { useEffect } from 'react';
import { PAGINATION_DEFAULT } from './consts.ts';
import { usePagination } from './usePagination.ts';
import { useLocation } from 'react-router-dom';

export const useSearchParams = () => {
  const { currentPage, currentPageSize } = usePagination();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    if (!currentPage || !currentPageSize) {
      setSearchParams({
        page: `${PAGINATION_DEFAULT.PAGE}`,
        pageSize: `${PAGINATION_DEFAULT.PAGE_SIZE}`,
      });
    } else {
      setSearchParams({
        page: searchParams.get('page') || location.state?.page,
        pageSize: searchParams.get('pageSize') || location.state?.pageSize,
      });
    }
  }, [
    location.state?.pageSize,
    location.state?.page,
    currentPage,
    currentPageSize,
    setSearchParams,
    searchParams,
  ]);
};
