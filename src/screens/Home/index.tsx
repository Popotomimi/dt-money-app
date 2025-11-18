import { Text, TouchableOpacity } from "react-native";
import { useAuthContext } from "../../context/auth.context";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "../../Components/AppHeader";
import { useTransactionContext } from "../../context/transaction.context";
import { useErrorHandler } from "../../shared/hooks/useErrorHandler";
import { useEffect } from "react";

export const Home = () => {
  const { handleLogout } = useAuthContext();
  const { fetchCategories } = useTransactionContext();
  const { handleError } = useErrorHandler();

  const handleFetchCategories = async () => {
    try {
      await fetchCategories();
    } catch (error) {
      handleError(error, "Falha ao buscar as categorias");
    }
  };

  useEffect(() => {
    (async () => {
      handleFetchCategories();
    })();
  }, []);

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
