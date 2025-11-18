import { View } from "react-native";
import { AppHeader } from "../../../Components/AppHeader";
import { ScrollView } from "react-native-gesture-handler";

export const ListHeader = () => {
  return (
    <>
      <AppHeader />
      <View className="h-[150] w-full">
        <View className="h-[50] bg-background-primary" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="absolute pl-6 h-[141]"></ScrollView>
      </View>
    </>
  );
};
