import { Snackbar } from "./src/Components/Snackbar";
import { AuthContextProvider } from "./src/context/auth.context";
import { SnackbarContextProvider } from "./src/context/snackbar.context";
import NavigationRoutes from "./src/routes";
import "./src/styles/global.css";

export default function App() {
  return (
    <SnackbarContextProvider>
      <AuthContextProvider>
        <NavigationRoutes />
        <Snackbar />
      </AuthContextProvider>
    </SnackbarContextProvider>
  );
}
