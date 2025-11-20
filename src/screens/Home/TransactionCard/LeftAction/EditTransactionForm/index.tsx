import { FC, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CurrencyInput from "react-native-currency-input";
import * as Yup from "yup";
import { useBottomSheetContext } from "../../../../../context/bottomsheet.context";
import { useTransactionContext } from "../../../../../context/transaction.context";
import { useErrorHandler } from "../../../../../shared/hooks/useErrorHandler";
import { colors } from "../../../../../shared/colors";
import { SelectCategoryModal } from "../../../../../Components/SelectCategoryModal";
import { TransactionTypeSelector } from "../../../../../Components/SelectType";
import { AppButton } from "../../../../../Components/AppButton";
import { ErrorMessage } from "../../../../../Components/ErrorMessage";
import { transactionSchema } from "./schema";
import { Transaction } from "../../../../../shared/interfaces/https/transaction";
import { UpdateTransactionInterface } from "../../../../../shared/interfaces/https/update-transaction-request";

type ValidationErrorsTypes = Record<keyof UpdateTransactionInterface, string>;

interface Params {
  transaction: Transaction;
}

export const EditTransactionForm: FC<Params> = ({
  transaction: transactionToUpdate,
}) => {
  const { closeBottomSheet } = useBottomSheetContext();
  const { updateTransaction } = useTransactionContext();
  const { handleError } = useErrorHandler();

  const [loading, setLoding] = useState(false);

  const [transaction, setTransaction] = useState<UpdateTransactionInterface>({
    categoryId: transactionToUpdate.categoryId,
    description: transactionToUpdate.description,
    id: transactionToUpdate.id,
    typeId: transactionToUpdate.typeId,
    value: transactionToUpdate.value,
  });

  const [validationErrors, setValidationErros] =
    useState<ValidationErrorsTypes>();

  const handleUpdateTransaction = async () => {
    try {
      setLoding(true);
      await transactionSchema.validate(transaction, {
        abortEarly: false,
      });
      await updateTransaction(transaction);
      closeBottomSheet();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const erros = {} as ValidationErrorsTypes;

        error.inner.forEach((err) => {
          if (err.path) {
            erros[err.path as keyof UpdateTransactionInterface] = err.message;
          }
        });

        setValidationErros(erros);
      } else {
        handleError(error, "Falha ao Atualizar transação");
      }
    } finally {
      setLoding(false);
    }
  };

  const setTransactionData = (
    key: keyof UpdateTransactionInterface,
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
          <AppButton onPress={handleUpdateTransaction}>
            {loading ? <ActivityIndicator color={colors.white} /> : "Atualizar"}
          </AppButton>
        </View>
      </View>
    </View>
  );
};
