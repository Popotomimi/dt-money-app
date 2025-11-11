import { useForm } from "react-hook-form";
import { AppInput } from "../../../Components/AppInput";
import { AppButton } from "../../../Components/AppButton";

export interface FormLoginParams {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormLoginParams>();

  return (
    <>
      <AppInput
        control={control}
        name="email"
        label="EMAIL"
        placeholder="mail@exemple.com.br"
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

      <AppButton iconName="arrow-forward" mode="fill">
        Login
      </AppButton>
    </>
  );
};
