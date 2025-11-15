import { Text, TouchableOpacity, View } from "react-native";
import { useAuthContext } from "../../context/auth.context";

export const Home = () => {
  const { handleLogout } = useAuthContext();

  return (
    <View>
      <Text>Home painho</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};
