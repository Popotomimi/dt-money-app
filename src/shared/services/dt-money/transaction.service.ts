import { dtMoneyApi } from "../../api/dt.money";
import { TransactionCategory } from "../../interfaces/https/transaction-category-response";
import { CreateTransactionInterface } from "../../interfaces/https/create-transaction-request";
import { UpdateTransactionInterface } from "../../interfaces/https/update-transaction-request";
import {
  GetTransactionResponse,
  GetTransactionsParams,
} from "../../interfaces/https/get-transactions-request";
import qs from "qs";

export const getTransactionCategories = async (): Promise<
  TransactionCategory[]
> => {
  const { data } = await dtMoneyApi.get<TransactionCategory[]>(
    "/transaction/categories"
  );

  return data;
};

export const createTransaction = async (
  transaction: CreateTransactionInterface
) => {
  await dtMoneyApi.post("/transaction", transaction);
};

export const getTransactions = async (
  params: GetTransactionsParams
): Promise<GetTransactionResponse> => {
  const { data } = await dtMoneyApi.get<GetTransactionResponse>(
    "/transaction",
    {
      params,
      paramsSerializer: (p) => qs.stringify(p, { arrayFormat: "repeat" }),
    }
  );

  return data;
};

export const deleteTransaction = async (id: number) => {
  await dtMoneyApi.delete(`/transaction/${id}`);
};

export const updateTransaction = async (
  transaction: UpdateTransactionInterface
) => {
  await dtMoneyApi.put("/transaction", transaction);
};
