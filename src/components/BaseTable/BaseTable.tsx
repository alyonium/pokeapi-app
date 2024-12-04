import { Column } from './table';
import Pagination from './Pagination/Pagination.tsx';
import styles from './BaseTable.module.css';

type BaseTableProps<T, K extends keyof T> = {
  rows: Array<T>;
  cols: Array<Column<T, K>>;
  totalCount: number | undefined;
  onUpdatePagination: (currentPage, pageSize) => void;
  onSelectRow: (rowId) => void;
};

const BaseTable = <T, K extends keyof T>({
  rows,
  cols,
  totalCount,
  onUpdatePagination,
  onSelectRow,
}: BaseTableProps<T, K>) => {
  return (
    <>
      <table className={styles.wrapper}>
        <thead>
          <tr>
            {cols.map((col) => {
              return (
                <th key={col.field} style={{ width: col.width }}>
                  {col.headerName}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {rows?.map((row, index) => {
            return (
              <tr key={index} onClick={() => onSelectRow(row.id)}>
                {cols.map((col, index) => {
                  return (
                    <td key={index} style={{ width: col.width }}>
                      {row[col.field]}
                    </td>
                  );
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
