import { TransactionCardType } from "..";
import { TransactionTypes } from "../../../../../shared/enums/transaction-types";

interface CardData {
  label: string;
  bgColor: string;
}

export const CARD_DATA: Record<TransactionCardType, CardData> = {
  [TransactionTypes.EXPENSE]: {
    label: "Saída",
    bgColor: "background-tertiary",
  },
  [TransactionTypes.REVENUE]: {
    label: "Entrada",
    bgColor: "background-tertiary",
  },
  total: {
    label: "Total",
    bgColor: "accent-brand-background-primary",
  },
};
