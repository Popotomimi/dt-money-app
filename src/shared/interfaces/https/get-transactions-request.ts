import { TotalTransactions } from "./total-transactions";
import { Transaction } from "./transaction";

export interface Pagination {
  page: number;
  perPage: number;
  totalRows?: number;
  totalPages: number;
}

export interface GetTransactionsParams {
  page: number;
  perPage: number;
  from?: Date;
  to?: Date;
  typeId?: number;
  categoryIds?: number[];
  searchText?: string;
}

export interface GetTransactionResponse {
  data: Transaction[];
  totalRows: number;
  totalPages: number;
  page: number;
  perPage: number;
  totalTransactions: TotalTransactions;
}

export interface Filters {
  from?: Date;
  to?: Date;
  typeId?: number;
  categoryIds: Record<number, boolean>;
}
