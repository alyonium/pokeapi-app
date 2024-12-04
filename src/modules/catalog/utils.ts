import { PAGINATION_DEFAULT } from '../../utils/consts.ts';

export const getCurrentPaginationOptions = ({
  currentPage,
  currentPageSize,
  totalPages,
}) => {
  if (currentPage > totalPages) {
    return {
      page: `${totalPages}`,
      pageSize: `${currentPageSize}`,
    };
  }

  if (currentPageSize > 100) {
    return {
      page: `${PAGINATION_DEFAULT.PAGE}`,
      pageSize: '100',
    };
  }

  if (currentPage < 1 || currentPageSize < 1) {
    return {
      page: `${PAGINATION_DEFAULT.PAGE}`,
      pageSize: `${PAGINATION_DEFAULT.PAGE_SIZE}`,
    };
  }

  if (!currentPage || !currentPageSize) {
    return {
      page: `${PAGINATION_DEFAULT.PAGE}`,
      pageSize: `${PAGINATION_DEFAULT.PAGE_SIZE}`,
    };
  }

  return {
    page: `${currentPage}`,
    pageSize: `${currentPageSize}`,
  };
};
