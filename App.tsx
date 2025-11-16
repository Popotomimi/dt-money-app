import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Snackbar } from "./src/Components/Snackbar";
import { AuthContextProvider } from "./src/context/auth.context";
import { BottomSheetProvider } from "./src/context/bottomsheet.context";
import { SnackbarContextProvider } from "./src/context/snackbar.context";
import NavigationRoutes from "./src/routes";
import "./src/styles/global.css";

export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <SnackbarContextProvider>
        <AuthContextProvider>
          <BottomSheetProvider>
            <NavigationRoutes />
            <Snackbar />
          </BottomSheetProvider>
        </AuthContextProvider>
      </SnackbarContextProvider>
    </GestureHandlerRootView>
  );
}
