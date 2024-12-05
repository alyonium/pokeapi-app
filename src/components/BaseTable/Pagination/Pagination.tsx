import { PAGINATION_DEFAULT } from '../../../utils/consts.ts';
import styles from './Pagination.module.scss';
import ArrowRight from '../../Icons/ArrowRight.tsx';
import ArrowLeft from '../../Icons/ArrowLeft.tsx';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import { usePagination } from '../../../utils/usePagination.ts';
import { pageSizeOptions } from './consts.ts';

type PaginationProps = {
  totalCount: number | undefined;
  onUpdatePagination: (currentPage, pageSize) => void;
};

const Pagination = ({ totalCount, onUpdatePagination }: PaginationProps) => {
  const [, setSearchParams] = useSearchParams();
  const { currentPage, currentPageSize } = usePagination();
  const totalPages =
    Math.ceil(totalCount / currentPageSize) || PAGINATION_DEFAULT.TOTAL_PAGES;

  const updatePagination = (newCurrentPage: number, newPageSize: number) => {
    setSearchParams({
      page: `${newCurrentPage}`,
      pageSize: `${newPageSize}`,
    });
    onUpdatePagination(newCurrentPage, newPageSize);
  };

  const totalBlock = (
    <div className={styles.total}>
      Total:
      <span>{totalCount}</span>
    </div>
  );

  const pageSizeBlock = (
    <Select
      id="pageSizeOptions"
      onChange={(value) =>
        updatePagination(PAGINATION_DEFAULT.PAGE, value.value)
      }
      options={pageSizeOptions}
      defaultValue={{
        value: currentPageSize,
        label: currentPageSize,
      }}
    />
  );

  const paginationBlock = () => {
    const a = [];
    for (let i = 1; i <= totalPages; i++) {
      a.push(
        <div
          className={currentPage === i ? styles.currentPage : ''}
          onClick={() => updatePagination(i, currentPageSize)}
        >
          {i}
        </div>,
      );
    }
    return a;
  };
  if (totalPages < 6) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.totalWrapper}>
          {totalBlock}

          {pageSizeBlock}
        </div>

        <div className={styles.countsWrapper}>{paginationBlock()}</div>
      </div>
    );
  }

  if (currentPage === 1 || currentPage === 2) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.totalWrapper}>
          {totalBlock}

          {pageSizeBlock}
        </div>

        <div className={styles.countsWrapper}>
          <div
            className={currentPage === 1 ? styles.currentPage : ''}
            onClick={() => updatePagination(1, currentPageSize)}
          >
            1
          </div>
          <div
            className={currentPage === 2 ? styles.currentPage : ''}
            onClick={() => updatePagination(2, currentPageSize)}
          >
            2
          </div>
          <div onClick={() => updatePagination(3, currentPageSize)}>3</div>
          ...
          <div onClick={() => updatePagination(totalPages, currentPageSize)}>
            {totalPages}
          </div>
          <div
            className={styles.iconWrapper}
            onClick={() => updatePagination(currentPage + 1, currentPageSize)}
          >
            <ArrowRight />
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === totalPages || currentPage === totalPages - 1) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.totalWrapper}>
          {totalBlock}

          {pageSizeBlock}
        </div>

        <div className={styles.countsWrapper}>
          <div
            className={styles.iconWrapper}
            onClick={() => updatePagination(currentPage - 1, currentPageSize)}
          >
            <ArrowLeft />
          </div>
          <div onClick={() => updatePagination(1, currentPageSize)}>1</div>
          ...
          <div
            onClick={() => updatePagination(totalPages - 2, currentPageSize)}
          >
            {totalPages - 2}
          </div>
          <div
            className={currentPage === totalPages - 1 ? styles.currentPage : ''}
            onClick={() => updatePagination(totalPages - 1, currentPageSize)}
          >
            {totalPages - 1}
          </div>
          <div
            className={currentPage === totalPages ? styles.currentPage : ''}
            onClick={() => updatePagination(totalPages, currentPageSize)}
          >
            {totalPages}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.totalWrapper}>
        {totalBlock}

        {pageSizeBlock}
      </div>

      <div className={styles.countsWrapper}>
        <div
          className={styles.iconWrapper}
          onClick={() => updatePagination(currentPage - 1, currentPageSize)}
        >
          <ArrowLeft />
        </div>
        <div onClick={() => updatePagination(1, currentPageSize)}>1</div>
        ...
        <div onClick={() => updatePagination(currentPage - 1, currentPageSize)}>
          {currentPage - 1}
        </div>
        <div
          className={styles.currentPage}
          onClick={() => updatePagination(currentPage, currentPageSize)}
        >
          {currentPage}
        </div>
        <div onClick={() => updatePagination(currentPage + 1, currentPageSize)}>
          {currentPage + 1}
        </div>
        ...
        <div onClick={() => updatePagination(totalPages, currentPageSize)}>
          {totalPages}
        </div>
        <div
          className={styles.iconWrapper}
          onClick={() => updatePagination(currentPage + 1, currentPageSize)}
        >
          <ArrowRight />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
