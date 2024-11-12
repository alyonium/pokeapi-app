import { PAGE_SIZE } from '../../../utils/consts.ts';
import { useState } from 'react';
import styles from './Pagination.module.scss';
import ArrowRight from '../../Icons/ArrowRight.tsx';
import ArrowLeft from '../../Icons/ArrowLeft.tsx';

type PaginationProps = {
  totalCount: number | undefined;
  onUpdatePagination: (currentPage, pageSize) => void;
};

const Pagination = ({ totalCount, onUpdatePagination }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);
  const totalPages = Math.ceil(totalCount / pageSize);

  //TODO страничку в роутер закинуть

  const updatePagination = (newCurrentPage: number, newPageSize: number) => {
    setCurrentPage(newCurrentPage);
    setPageSize(newPageSize);
    onUpdatePagination(newCurrentPage, newPageSize);
  };

  if (currentPage === 1 || currentPage === 2) {
    return (
      <div className={styles.wrapper}>
        <div>Total: {totalCount} </div>

        <div className={styles.countsWrapper}>
          <div onClick={() => updatePagination(1, pageSize)}>1</div>
          <div onClick={() => updatePagination(2, pageSize)}>2</div>
          <div onClick={() => updatePagination(3, pageSize)}>3</div>
          <div>...</div>
          <div onClick={() => updatePagination(totalPages, pageSize)}>
            {totalPages}
          </div>
          <div onClick={() => updatePagination(currentPage + 1, pageSize)}>
            <ArrowRight />
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === totalPages || currentPage === totalPages - 1) {
    return (
      <div className={styles.wrapper}>
        <div>Total: {totalCount} </div>

        <div className={styles.countsWrapper}>
          <div onClick={() => updatePagination(currentPage - 1, pageSize)}>
            <ArrowLeft />
          </div>
          <div onClick={() => updatePagination(1, pageSize)}>1</div>
          <div>...</div>
          <div onClick={() => updatePagination(totalPages - 2, pageSize)}>
            {totalPages - 2}
          </div>
          <div onClick={() => updatePagination(totalPages - 1, pageSize)}>
            {totalPages - 1}
          </div>
          <div onClick={() => updatePagination(totalPages, pageSize)}>
            {totalPages}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div>Total: {totalCount} </div>

      <div className={styles.countsWrapper}>
        <div onClick={() => updatePagination(currentPage - 1, pageSize)}>
          <ArrowLeft />
        </div>
        <div onClick={() => updatePagination(1, pageSize)}>1</div>
        <div>...</div>
        <div onClick={() => updatePagination(currentPage - 1, pageSize)}>
          {currentPage - 1}
        </div>
        <div onClick={() => updatePagination(currentPage, pageSize)}>
          {currentPage}
        </div>
        <div onClick={() => updatePagination(currentPage + 1, pageSize)}>
          {currentPage + 1}
        </div>
        <div>...</div>
        <div onClick={() => updatePagination(totalPages, pageSize)}>
          {totalPages}
        </div>
        <div onClick={() => updatePagination(currentPage + 1, pageSize)}>
          <ArrowRight />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
