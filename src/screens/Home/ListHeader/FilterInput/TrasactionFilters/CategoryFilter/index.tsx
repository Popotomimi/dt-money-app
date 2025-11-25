import { Text, TouchableOpacity, View } from "react-native";
import { useTransactionContext } from "../../../../../../context/transaction.context";
import Checkbox from "expo-checkbox";

export const CategoryFilter = () => {
  const { categories, handleCategoryFilter, filters } = useTransactionContext();

  return (
    <View className="mb-6">
      <Text className="text-base font-medium mb-5 text-gray-600">
        Categorias
      </Text>

      {categories.map(({ id, name }) => (
        <TouchableOpacity
          onPress={() => handleCategoryFilter(id)}
          className="flex-row items-center py-2"
          key={`category-${id}`}>
          <Checkbox
            onValueChange={() => handleCategoryFilter(id)}
            value={Boolean(filters.categoryIds[id])}
            className="mr-4"
          />
          <Text className="text-lg text-white">{name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
