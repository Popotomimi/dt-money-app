import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTransactionContext } from "../../context/transaction.context";
import { useErrorHandler } from "../../shared/hooks/useErrorHandler";
import { useEffect } from "react";
import { ListHeader } from "./ListHeader";
import { TransactionCard } from "./TransactionCard";
import { EmptyList } from "./EmptyList";
import { colors } from "../../shared/colors";

export const Home = () => {
  const {
    fetchCategories,
    fetchTransactions,
    transactions,
    refreshTransactions,
    loadMoreTransactions,
    handleLoadings,
    loadings,
  } = useTransactionContext();
  const { handleError } = useErrorHandler();

  const handleFetchCategories = async () => {
    try {
      handleLoadings({
        key: "initial",
        value: true,
      });
      await fetchCategories();
    } catch (error) {
      handleError(error, "Falha ao buscar as categorias");
    } finally {
      handleLoadings({
        key: "initial",
        value: false,
      });
    }
  };

  const handleFechInitialTransactions = async () => {
    try {
      handleLoadings({
        key: "initial",
        value: true,
      });
      await fetchTransactions({ page: 1 });
    } catch (error) {
      handleError(error, "Falha ao buscar transações");
    } finally {
      handleLoadings({
        key: "initial",
        value: false,
      });
    }
  };

  const handleLoadMoreTransactions = async () => {
    try {
      handleLoadings({
        key: "loadMore",
        value: true,
      });
      await loadMoreTransactions();
    } catch (error) {
      handleError(error, "Falha ao buscar novas transações");
    } finally {
      handleLoadings({
        key: "loadMore",
        value: false,
      });
    }
  };

  const handleRefreshTransactions = async () => {
    try {
      handleLoadings({
        key: "refresh",
        value: true,
      });
      await refreshTransactions();
    } catch (error) {
      handleError(error, "Falha ao recarregar as transações");
    } finally {
      handleLoadings({
        key: "refresh",
        value: false,
      });
    }
  };

  useEffect(() => {
    (async () => {
      await Promise.all([
        handleFetchCategories(),
        handleFechInitialTransactions(),
      ]);
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        className="bg-background-secondary"
        ListHeaderComponent={ListHeader}
        data={transactions}
        keyExtractor={(item, index) => `transaction-${item.id}-${index}`}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        onEndReached={handleLoadMoreTransactions}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={loadings.initial ? null : EmptyList}
        ListFooterComponent={
          loadings.loadMore ? (
            <ActivityIndicator
              color={colors["accent-brand-light"]}
              size={"large"}
            />
          ) : null
        }
        refreshControl={
          <RefreshControl
            refreshing={loadings.refresh}
            onRefresh={handleRefreshTransactions}
          />
        }
      />
    </SafeAreaView>
  );
};
