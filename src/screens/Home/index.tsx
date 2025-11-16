import { Text, TouchableOpacity } from "react-native";
import { useAuthContext } from "../../context/auth.context";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "../../Components/AppHeader";

export const Home = () => {
  const { handleLogout } = useAuthContext();

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <AppHeader />
      <Text>Home painho</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
