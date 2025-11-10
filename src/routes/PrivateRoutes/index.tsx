import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../../screens/Home";

export type PrivateStackParamsList = {
  Home: undefined;
};

export const PrivateRoutes = () => {
  const PrivateStack = createStackNavigator<PrivateStackParamsList>();

  return (
    <PrivateStack.Navigator>
      <PrivateStack.Screen name="Home" component={Home} />
    </PrivateStack.Navigator>
  );
};
