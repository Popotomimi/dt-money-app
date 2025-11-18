import { dtMoneyApi } from "../../api/dt.money";
import { TransactionCategory } from "../../interfaces/https/transaction-category-response";
import { CreateTransactionInterface } from "../../interfaces/https/create-transaction-request";

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
