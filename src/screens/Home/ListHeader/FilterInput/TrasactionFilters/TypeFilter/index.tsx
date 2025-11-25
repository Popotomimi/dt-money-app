import Checkbox from "expo-checkbox";
import { Text, TouchableOpacity, View } from "react-native";
import { useTransactionContext } from "../../../../../../context/transaction.context";
import { TransactionTypes } from "../../../../../../shared/enums/transaction-types";

export const TypeFilter = () => {
  const { filters, handleFilters } = useTransactionContext();

  const selectType = (typeId: TransactionTypes) => {
    handleFilters({ key: "typeId", value: typeId });
  };

  return (
    <View className="mb-6">
      <Text className="text-base font-medium mb-5 text-gray-600">
        Tipo de transação
      </Text>

      <TouchableOpacity
        onPress={() => selectType(TransactionTypes.REVENUE)}
        className="flex-row items-center py-2">
        <Checkbox
          value={filters.typeId === TransactionTypes.REVENUE}
          onValueChange={() => selectType(TransactionTypes.REVENUE)}
        />
        <Text className="ml-4 text-lg text-white">Entrada</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => selectType(TransactionTypes.EXPENSE)}
        className="flex-row items-center py-2">
        <Checkbox
          value={filters.typeId === TransactionTypes.EXPENSE}
          onValueChange={() => selectType(TransactionTypes.EXPENSE)}
        />
        <Text className="ml-4 text-lg text-white">Saída</Text>
      </TouchableOpacity>
    </View>
  );
};
