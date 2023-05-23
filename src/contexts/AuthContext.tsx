import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
} from "react";
import { AuthContextType, AuthUser } from "../types/Authentication";

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("No AuthContext");

  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}
export default function AuthProvider(props: AuthProviderProps) {
  const localStorageAuthUser = localStorage.getItem("authUser");
  const localStorageIsLoggedIn = localStorage.getItem("isLoggedIn");

  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (localStorageAuthUser) {
      console.log(JSON.parse(localStorageAuthUser))
      setAuthUser(JSON.parse(localStorageAuthUser));
    }
    if (localStorageIsLoggedIn) {
      console.log(JSON.parse(localStorageIsLoggedIn));
      setIsLoggedIn(JSON.parse(localStorageIsLoggedIn));
    }
  }, []);

  useEffect(() => {
    if (authUser) {
      localStorage.setItem("authUser", JSON.stringify(authUser));
    }
  }, [authUser]);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);


  const value: AuthContextType = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
