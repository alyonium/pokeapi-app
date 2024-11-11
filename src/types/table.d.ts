export type Column<T, K extends keyof T> = {
  field: K;
  headerName: string;
};
