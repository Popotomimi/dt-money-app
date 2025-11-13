import { useForm } from "react-hook-form";
import { AppInput } from "../../../Components/AppInput";
import { AppButton } from "../../../Components/AppButton";
import { Text, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { PublicStackParamsList } from "../../../routes/PublicRoutes";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";

export interface FormLoginParams {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormLoginParams>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>();

  const onSubmit = async () => {};

  return (
    <>
      <AppInput
        control={control}
        name="email"
        label="EMAIL"
        placeholder="mail@example.com.br"
        leftIconName="mail-outline"
      />

      <AppInput
        control={control}
        name="password"
        label="SENHA"
        placeholder="Sua senha"
        leftIconName="lock-outline"
        secureTextEntry
      />

      <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
        <AppButton iconName="arrow-forward" onPress={handleSubmit(onSubmit)}>
          Login
        </AppButton>

        <View>
          <Text className="mb-6 text-gray-300 text-base">
            Ainda não possui uma conta?{" "}
          </Text>
          <AppButton
            iconName="arrow-forward"
            mode="outline"
            onPress={() => navigation.navigate("Register")}>
            Cadastrar
          </AppButton>
        </View>
      </View>
    </>
  );
};
