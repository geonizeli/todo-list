import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type LoginCallback = (email: string, password: string) => void;
type LogoutCallback = () => void;

type AuthProviderValue = {
  token: string | null;
  authenticated: boolean;
  login: LoginCallback;
  logout: LogoutCallback;
  setIsLoginDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoginDialogOpen: boolean;
};

const AuthContext = createContext<AuthProviderValue | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("You probably forgot to put <PaymentProvider>.");
  }

  return context;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children, ...rest }: AuthProviderProps) => {
  const [loading] = useState(true);
  const [token] = useState<AuthProviderValue["token"]>(null);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const login = useCallback<LoginCallback>((_email, __password) => {
    throw new Error("Not implemented yet");
  }, []);

  const logout = useCallback<LogoutCallback>(() => {
    throw new Error("Not implemented yet");
  }, []);

  const authenticated = !!token;

  const providerValue = useMemo(
    () => ({
      loading,
      token,
      authenticated,
      login,
      logout,
    }),
    [loading, token, authenticated, login, logout]
  );

  return (
    <AuthContext.Provider
      value={{
        ...providerValue,
        ...rest,
        isLoginDialogOpen,
        setIsLoginDialogOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
