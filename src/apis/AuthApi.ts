import {  AuthUser, LoginUser, RegisterUser } from "../types/Authentication";
import { axiosClient } from "./axiosClient";

class AuthApi {
  register = (registerUser: RegisterUser) => {
    const url = 'auth/register'
    return axiosClient.post(url, registerUser);
  };
  login = (loginUser : LoginUser) => {
    const url = 'auth/login';
    return axiosClient.post<AuthUser>(url, loginUser);
  }
}

const authApi = new AuthApi();

export default authApi;
