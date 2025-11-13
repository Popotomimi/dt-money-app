import { View } from "react-native";
import { DismissKeyboardView } from "../../Components/DismissKeyboardView";
import { LoginForm } from "./LoginForm";
import { AuthHeader } from "../../Components/AuthHeader";
import { useAuthContext } from "../../context/auth.context";

export const Login = () => {
  const {} = useAuthContext();

  return (
    <DismissKeyboardView>
      <View className="flex-1 w-[82%] self-center">
        <AuthHeader />
        <LoginForm />
      </View>
    </DismissKeyboardView>
  );
};
