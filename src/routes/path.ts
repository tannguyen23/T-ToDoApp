const path = (root: string, subString: string) => {
  return `${root}${subString}`;
};

const ROOTS_AUTH = "/auth";
const ROOTS_USER = "/user";

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
  forgetPassword: path(ROOTS_AUTH, "/forget-password"),
  resetPassword: path(ROOTS_AUTH, "/reset"),
};

export const PATH_PAGE = {
  about: "/about",
  contact: "/contact",
  page404: "/404",
  page500: "/500",
};

export const PATH_USER = {
  root: ROOTS_USER,
  task: path(ROOTS_USER, "/task"),
  team: {
    root: path(ROOTS_USER, "/team"),
    member: path(ROOTS_USER, "/team/member"),
  },
};
