import { createContext, useCallback, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { createApiClient } from "../utils/apiFetch";

type LoginCallback = (email: string, password: string) => void;
type LogoutCallback = () => void;

type AuthProviderValue = {
  token: string | null;
  authenticated: boolean;
  login: LoginCallback;
  logout: LogoutCallback;
  setIsLoginDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoginDialogOpen: boolean;
  apiClient: typeof fetch;
};

export const AuthContext = createContext<AuthProviderValue | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children, ...rest }: AuthProviderProps) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [loading] = useState(true);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const token = cookies.token;
  const setToken = (value: string) => {
    setCookie("token", value);
  };
  const removeToken = () => {
    removeCookie("token");
  };
  const apiClient = createApiClient(token ?? "");

  const login = useCallback<LoginCallback>(
    (email, password) => {
      apiClient("users/sign_in", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      }).then(async (res) => {
        setToken(await res.json());
      });
    },
    [apiClient, setToken]
  );

  const logout = useCallback<LogoutCallback>(() => {
    apiClient("users/sign_out", {
      method: "DELETE",
    }).then(() => {
      removeToken();
    });
  }, [apiClient, setToken]);

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
        apiClient,
        isLoginDialogOpen,
        setIsLoginDialogOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
