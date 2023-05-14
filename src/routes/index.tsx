import { FC, ReactNode, Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";
import { PATH_AUTH, PATH_PAGE, PATH_USER } from "./path";
import LoadingPage from "../pages/LoadingPage";
import AuthGuard from "../guards/AuthGuard";
import GuestGuard from "../guards/GuestGuard";

interface Route {
  key: string;
  title: string;
  path: string;
  enabled: boolean;
  // component: FC<{}>;
  component: JSX.Element;
}

const Loadable = (Component: any) => (props: any) => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Component {...props} />
    </Suspense>
  );
};

//Authenication
const LoginLoadable = Loadable(lazy(() => import("../pages/Login")));
const RegisterLoadable = Loadable(lazy(() => import("../pages/Register")));
const Page404Loadable = Loadable(lazy(() => import("../pages/Page404")));

//Page
const TaskLoadable = Loadable(lazy(() => import("../pages/Task")));
const TeamLoadable = Loadable(lazy(() => import("../pages/Team")));

export const routes: Array<Route> = [
  {
    key: "/",
    title: "/",
    path: "/",
    enabled: true,
    component: (
      <AuthGuard>
        <TaskLoadable />
      </AuthGuard>
    ),
  },
  {
    key: "*",
    title: "*",
    path: "*",
    enabled: true,
    component: (
      <GuestGuard>
        <Page404Loadable />
      </GuestGuard>
    ),
  },
  {
    key: "task",
    title: "Task",
    path: PATH_USER.task,
    enabled: true,
    component: (
      <AuthGuard>
        <TaskLoadable />
      </AuthGuard>
    ),
  },
  {
    key: "team",
    title: "Team",
    path: PATH_USER.team.root,
    enabled: true,
    component: (
      <AuthGuard>
        <TeamLoadable />
      </AuthGuard>
    ),
  },
  {
    key: "login",
    title: "Login",
    path: PATH_AUTH.login,
    enabled: true,
    component: (
      <GuestGuard>
        <LoginLoadable />
      </GuestGuard>
    ),
  },
  {
    key: "register",
    title: "Register",
    path: PATH_AUTH.register,
    enabled: true,
    component: (
      <GuestGuard>
        <RegisterLoadable />
      </GuestGuard>
    ),
  },
  {
    key: "404",
    title: "404",
    path: PATH_PAGE.page404,
    enabled: true,
    component: (
      <GuestGuard>
        <Page404Loadable />
      </GuestGuard>
    ),
  },
];
