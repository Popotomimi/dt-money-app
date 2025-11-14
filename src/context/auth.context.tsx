import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { FormLoginParams } from "../screens/Login/LoginForm";
import { FormRegisterParams } from "../screens/Register/RegisterForm";
import * as authService from "../shared/services/dt-money/auth.service";
import { IUser } from "../shared/interfaces/user-interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IAuthenticateResponse } from "../shared/interfaces/https/authenticate-response";

type AuthContextType = {
  user: IUser | null;
  token: string | null;
  handleAuthenticate: (params: FormLoginParams) => Promise<void>;
  handleRegister: (params: FormRegisterParams) => Promise<void>;
  handleLogout: () => void;
  restoreUserSession: () => Promise<string | null>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleAuthenticate = async (userData: FormLoginParams) => {
    const { token, user } = await authService.authenticate(userData);
    await AsyncStorage.setItem(
      "dt-money-user",
      JSON.stringify({ user, token })
    );
    setToken(token);
    setUser(user);
  };

  const handleRegister = async (FormData: FormRegisterParams) => {
    const { token, user } = await authService.registerUser(FormData);
    await AsyncStorage.setItem(
      "dt-money-user",
      JSON.stringify({ user, token })
    );
    setToken(token);
    setUser(user);
  };

  const handleLogout = () => {};

  const restoreUserSession = async () => {
    const userData = await AsyncStorage.getItem("dt-money-user");
    if (userData) {
      const { token, user } = JSON.parse(userData) as IAuthenticateResponse;
      setUser(user);
      setToken(token);
    }

    return userData;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        handleAuthenticate,
        handleRegister,
        handleLogout,
        restoreUserSession,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  return context;
};
