import { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import Login from "../pages/Login";
import { useNavigate } from "react-router-dom";

interface AuthGuardProps {
  children: ReactNode;
}
export default function AuthGuard(props: AuthGuardProps) {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Login></Login>
  } else {
    return <>{props.children}</>
  }
}
