import { getAccessToken } from '../localStorage/localStorage';
import { LoginResponseType, LoginUser, RegisterUser } from '../types/Authentication';
import { axiosClient } from './axiosClient';

class AuthApi {
	register = (registerUser: RegisterUser) => {
		const url = "auth/register";
		return axiosClient.post(url, registerUser);
	};
	login = (loginUser: LoginUser) => {
		const url = "auth/login";
		return axiosClient.post<LoginResponseType>(url, loginUser);
	};
	refreshToken = (refreshToken: string) => {
		const url = "auth/refresh";
		return axiosClient.post<{ accessToken: string }>(
			url,
			{ refreshToken },
			{
				headers: { x_authorization: getAccessToken() },
			}
		);
	};
}

const authApi = new AuthApi();

export default authApi;
