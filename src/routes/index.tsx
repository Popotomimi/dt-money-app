import { NavigationContainer } from "@react-navigation/native";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { useCallback, useState } from "react";
import { useAuthContext } from "../context/auth.context";
import { Loading } from "../screens/Loading";

const NavigationRoutes = () => {
  const [loading, setLoading] = useState(true);
  const { token, user } = useAuthContext();

  const Routes = useCallback(() => {
    if (loading) {
      return <Loading setLoading={setLoading} />;
    }

    if (!user || !token) {
      return <PublicRoutes />;
    } else {
      return <PrivateRoutes />;
    }
  }, [user, token, loading]);

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
};

export default NavigationRoutes;
