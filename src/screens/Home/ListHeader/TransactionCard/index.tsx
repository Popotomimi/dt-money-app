import { Text, View } from "react-native";
import { TransactionTypes } from "../../../../shared/enums/transaction-types";
import { FC } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useTransactionContext } from "../../../../context/transaction.context";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ICONS } from "./strategies/icon-strategy";
import { CARD_DATA } from "./strategies/card-data-strategy";
import { moneyMapper } from "../../../../shared/utils/money-mapper";
import clsx from "clsx";

export type TransactionCardType = TransactionTypes | "total";

interface Props {
  type: TransactionCardType;
  amount: number;
}

export const TransactionCard: FC<Props> = ({ amount, type }) => {
  const iconData = ICONS[type];
  const cardData = CARD_DATA[type];

  const { transactions } = useTransactionContext();

  const lastTransaction = transactions.find(
    ({ type: transactionType }) => transactionType.id === type
  );

  return (
    <View
      className={clsx(
        `bg-${cardData.bgColor} min-w-[280] rounded-[6] px-8 py-6 justify-between mr-6`,
        type === "total" && "mr-12"
      )}>
      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-white text-base">{cardData.label}</Text>
        <MaterialIcons name={iconData.name} color={iconData.color} size={26} />
      </View>
      <View>
        <Text className="text-gray-400 text-2xl font-bold">
          R$ {moneyMapper(amount)}
        </Text>
        {type !== "total" && (
          <Text className="text-gray-700">
            {lastTransaction?.createdAt
              ? `Última ${cardData.label.toLocaleLowerCase()} em ` +
                format(new Date(lastTransaction.createdAt), "d 'de' MMM", {
                  locale: ptBR,
                })
              : "Nenhuma transação encontrada"}
          </Text>
        )}
      </View>
    </View>
  );
};
