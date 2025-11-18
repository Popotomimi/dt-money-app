import { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CreateTransactionInterface } from "../../shared/interfaces/https/create-transaction-request";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../shared/colors";
import { useBottomSheetContext } from "../../context/bottomsheet.context";
import CurrencyInput from "react-native-currency-input";
import { TransactionTypeSelector } from "../SelectType";
import { SelectCategoryModal } from "../SelectCategoryModal";
import { transactionSchema } from "./schema";
import * as Yup from "yup";
import { AppButton } from "../AppButton";
import { ErrorMessage } from "../ErrorMessage";
import { useTransactionContext } from "../../context/transaction.context";
import { useErrorHandler } from "../../shared/hooks/useErrorHandler";

type ValidationErrorsTypes = Record<keyof CreateTransactionInterface, string>;

export const NewTransaction = () => {
  const { closeBottomSheet } = useBottomSheetContext();
  const { createTransaction } = useTransactionContext();
  const { handleError } = useErrorHandler();

  const [loading, setLoding] = useState(false);

  const [transaction, setTransaction] = useState<CreateTransactionInterface>({
    categoryId: 0,
    description: "",
    typeId: 0,
    value: 0,
  });

  const [validationErrors, setValidationErros] =
    useState<ValidationErrorsTypes>();

  const handleCreateTransaction = async () => {
    try {
      setLoding(true);
      await transactionSchema.validate(transaction, {
        abortEarly: false,
      });
      await createTransaction(transaction);
      closeBottomSheet();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const erros = {} as ValidationErrorsTypes;

        error.inner.forEach((err) => {
          if (err.path) {
            erros[err.path as keyof CreateTransactionInterface] = err.message;
          }
        });

        setValidationErros(erros);
      } else {
        handleError(error, "Falha ao criar transação");
      }
    } finally {
      setLoding(false);
    }
  };

  const setTransactionData = (
    key: keyof CreateTransactionInterface,
    value: string | number
  ) => {
    setTransaction((prevData) => ({ ...prevData, [key]: value }));
  };

  return (
    <View className="px-8 py-5">
      <TouchableOpacity className="w-full flex-row items-center justify-between">
        <Text className="text-white text-xl font-bold">Nova transação</Text>
        <MaterialIcons
          onPress={closeBottomSheet}
          name="close"
          size={20}
          color={colors.gray[700]}
        />
      </TouchableOpacity>

      <View className="flex-1 mt-8 mb-8">
        <TextInput
          onChangeText={(text) => setTransactionData("description", text)}
          placeholder="Descrição"
          placeholderTextColor={colors.gray[700]}
          value={transaction.description}
          className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-[6] pl-4"
        />
        {validationErrors?.description && (
          <ErrorMessage>{validationErrors.description}</ErrorMessage>
        )}

        <CurrencyInput
          className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-[6] pl-4"
          value={transaction.value}
          prefix="R$"
          delimiter="."
          separator=","
          precision={2}
          minValue={0}
          onChangeValue={(value) => setTransactionData("value", value ?? 0)}
        />
        {validationErrors?.value && (
          <ErrorMessage>{validationErrors.value}</ErrorMessage>
        )}

        <SelectCategoryModal
          selectedCategory={transaction.categoryId}
          onSelect={(categoryId) =>
            setTransactionData("categoryId", categoryId)
          }
        />
        {validationErrors?.categoryId && (
          <ErrorMessage>{validationErrors.categoryId}</ErrorMessage>
        )}

        <TransactionTypeSelector
          typeId={transaction.typeId}
          setTransacitionType={(typeId) => setTransactionData("typeId", typeId)}
        />
        {validationErrors?.typeId && (
          <ErrorMessage>{validationErrors.typeId}</ErrorMessage>
        )}

        <View className="my-4">
          <AppButton onPress={handleCreateTransaction}>
            {loading ? <ActivityIndicator color={colors.white} /> : "Registrar"}
          </AppButton>
        </View>
      </View>
    </View>
  );
};
