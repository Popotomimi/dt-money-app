import { format } from "date-fns";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

export const DateFilter = () => {
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const onStartCancel = () => {
    setShowStartDatePicker(false);
  };

  const onStartConfirm = (selectedDate: Date) => {
    setShowStartDatePicker(false);
  };

  const onEndCancel = () => {
    setShowEndDatePicker(false);
  };

  const onEndConfirm = (selectedDate: Date) => {
    setShowEndDatePicker(false);
  };

  return (
    <>
      <Text>Data</Text>

      <View className="flex-row justify-between mb-6">
        <View className="w-[48%]">
          <TouchableOpacity
            onPress={() => setShowStartDatePicker(true)}
            className="rounded-md p-2 border-b border-gray-800">
            <Text className="text-white text-lg">
              {format(new Date(), "dd/MM/yyyy")}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="w-[48%]">
          <TouchableOpacity
            onPress={() => setShowEndDatePicker(true)}
            className="rounded-md p-2 border-b border-gray-800">
            <Text className="text-white text-lg">
              {format(new Date(), "dd/MM/yyyy")}
            </Text>
          </TouchableOpacity>
        </View>

        <DateTimePicker
          isVisible={showStartDatePicker}
          date={new Date()}
          onCancel={onStartCancel}
          onConfirm={onStartConfirm}
          mode="date"
          confirmTextIOS="Confirmar"
          cancelTextIOS="Cancelar"
          locale="pt_BR"
        />

        <DateTimePicker
          isVisible={showEndDatePicker}
          date={new Date()}
          onCancel={onEndCancel}
          onConfirm={onEndConfirm}
          mode="date"
          confirmTextIOS="Confirmar"
          cancelTextIOS="Cancelar"
          locale="pt_BR"
        />
      </View>
    </>
  );
};
