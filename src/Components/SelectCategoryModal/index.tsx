import clsx from "clsx";
import { FC, useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useTransactionContext } from "../../context/transaction.context";
import { Checkbox } from "expo-checkbox";

interface Props {
  selectedCategory: number;
  onSelect: (categoryId: number) => void;
}

export const SelectCategoryModal: FC<Props> = ({
  selectedCategory,
  onSelect,
}) => {
  const [showModal, setShowModal] = useState(false);
  const { categories } = useTransactionContext();
  const handleModal = () => setShowModal((prevState) => !prevState);

  const selected = useMemo(
    () => categories.find(({ id }) => id === selectedCategory),
    [categories, selectedCategory]
  );

  return (
    <>
      <TouchableOpacity
        onPress={handleModal}
        className="h-[50] bg-background-primary my-2 rounded-[6] pl-4 justify-center">
        <Text
          className={clsx(
            "text-lg",
            selected ? "text-white" : "text-gray-700"
          )}>
          {selected?.name ?? "Categoria"}
        </Text>
      </TouchableOpacity>

      <Modal visible={showModal} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={handleModal}>
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="w-[90%] bg-background-secondary p-4 rounded-xl">
              <Text className="text-white text-lg mb-4">
                Selecione uma categoria
              </Text>
              <FlatList
                keyExtractor={(item) => `category-${item.id}`}
                data={categories}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      onSelect(item.id);
                      setShowModal(false);
                    }}
                    className="flex-row items-center bg-gray-800 rounded-lg mb-2 p-4">
                    <Checkbox
                      value={selected?.id === item.id}
                      onValueChange={() => {
                        onSelect(item.id);
                        setShowModal(false);
                      }}
                    />
                    <Text className="text-white text-lg ml-3">{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};
