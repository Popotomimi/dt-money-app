import { Text, View } from "react-native";
import { DismissKeyboardView } from "../../Components/DismissKeyboardView";
import { RegisterForm } from "./RegisterForm";
import { AuthHeader } from "../../Components/AuthHeader";

export const Register = () => {
  return (
    <DismissKeyboardView>
      <View className="flex-1 w-[82%] self-center">
        <AuthHeader />
        <RegisterForm />
      </View>
    </DismissKeyboardView>
  );
};
