import { Column } from '../../types/table';
import Pagination from './Pagination/Pagination.tsx';

type BaseTableProps<T, K extends keyof T> = {
  rows: Array<T>;
  cols: Array<Column<T, K>>;
  totalCount: number | undefined;
  onUpdatePagination: (currentPage, pageSize) => void;
};

const BaseTable = <T, K extends keyof T>({
  rows,
  cols,
  totalCount,
  onUpdatePagination,
}: BaseTableProps<T, K>) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            {cols.map((col) => {
              return <th key={col.field}>{col.headerName}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {rows?.map((row) => {
            return (
              <tr>
                {cols.map((col) => {
                  return <td key={row[col.field]}>{row[col.field]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <Pagination
        totalCount={totalCount}
        onUpdatePagination={onUpdatePagination}
      />
    </>
  );
};

export default BaseTable;
