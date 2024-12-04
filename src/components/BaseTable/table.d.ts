export type Column<T, K extends keyof T> = {
  field: K;
  width: number;
  headerName: string;
};
