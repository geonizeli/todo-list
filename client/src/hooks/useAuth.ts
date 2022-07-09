import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("You probably forgot to put <AuthProvider>.");
  }

  return context;
};
