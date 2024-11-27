import { useLocation, useSearchParams } from 'react-router-dom';
import { PAGINATION_DEFAULT } from './consts.ts';

export const usePagination = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const currentPage =
    +searchParams.get('page') ||
    parseInt(location.state?.page) ||
    PAGINATION_DEFAULT.PAGE;
  const currentPageSize =
    +searchParams.get('pageSize') ||
    parseInt(location.state?.pageSize) ||
    PAGINATION_DEFAULT.PAGE_SIZE;

  return { currentPage, currentPageSize };
};
