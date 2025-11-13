import { useForm } from "react-hook-form";
import { AppInput } from "../../../Components/AppInput";
import { Text, View } from "react-native";
import { AppButton } from "../../../Components/AppButton";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";

export interface FormRegisterParams {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormRegisterParams>({
    defaultValues: {
      confirmPassword: "",
      email: "",
      name: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation();

  const onSubmit = async () => {};

  return (
    <>
      <AppInput
        control={control}
        name="name"
        leftIconName="person"
        label="NOME"
        placeholder="Seu nome"
      />

      <AppInput
        control={control}
        name="email"
        leftIconName="mail-outline"
        label="EMAIL"
        placeholder="mail@example.br"
      />

      <AppInput
        control={control}
        name="password"
        leftIconName="lock-outline"
        label="SENHA"
        placeholder="Sua senha"
        secureTextEntry
      />

      <AppInput
        control={control}
        name="confirmPassword"
        leftIconName="lock-outline"
        label="SENHA"
        placeholder="Confirme sua senha"
        secureTextEntry
      />

      <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
        <AppButton iconName="arrow-forward" onPress={handleSubmit(onSubmit)}>
          Cadastrar
        </AppButton>

        <View>
          <Text className="mb-6 text-gray-300 text-base">
            Já possui uma conta?{" "}
          </Text>
          <AppButton
            iconName="arrow-forward"
            mode="outline"
            onPress={() => navigation.goBack()}>
            Acessar
          </AppButton>
        </View>
      </View>
    </>
  );
};
