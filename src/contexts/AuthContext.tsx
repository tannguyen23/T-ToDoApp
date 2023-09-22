import { AxiosResponse } from 'axios';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import authApi from '../apis/AuthApi';
import { AuthContextType, AuthUser } from '../types/Authentication';

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
	const localStorageAccessToken = localStorage.getItem("accessToken");
	const localStorageRefreshToken = localStorage.getItem("refreshToken");
	const localStorageIsLoggedIn = localStorage.getItem("isLoggedIn");
	const [startRefreshTimeout, setStartRefreshTimeout] =
		useState<boolean>(false);
	const [authUser, setAuthUser] = useState<AuthUser | null>(null);
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [refreshToken, setRefreshToken] = useState<string | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	const TIMEOUT_MINUTTE = 58;
	const timeOutMiliSecond: number = 1000 * 60 * TIMEOUT_MINUTTE;
	const refreshTokenHandler = () => {
		if (localStorageRefreshToken) {
			console.log("Run API refresh token");
			authApi
				.refreshToken(localStorageRefreshToken)
				.then((response: AxiosResponse<{ accessToken: string }>) => {
					localStorage.setItem("accessToken", response.data.accessToken);
					setStartRefreshTimeout(true);
				});
		}
	};

	useEffect(() => {
		if (localStorageAuthUser) {
			console.log(JSON.parse(localStorageAuthUser));
			setAuthUser(JSON.parse(localStorageAuthUser));
		}
		if (localStorageIsLoggedIn) {
			console.log(JSON.parse(localStorageIsLoggedIn));
			setIsLoggedIn(JSON.parse(localStorageIsLoggedIn));
		}
		if (localStorageAccessToken) {
			console.log(localStorageAccessToken);
			setAccessToken(localStorageAccessToken);
		}
		if (localStorageRefreshToken) {
			console.log(localStorageRefreshToken);
			setRefreshToken(localStorageRefreshToken);
		}
	}, []);

	useEffect(() => {
		refreshTokenHandler();
	},[])

	useEffect(() => {
		if (authUser) {
			localStorage.setItem("authUser", JSON.stringify(authUser));
		}
	}, [authUser]);

	useEffect(() => {
		if (accessToken) {
			localStorage.setItem("accessToken", accessToken);
		}
	}, [accessToken]);

	useEffect(() => {
		if (refreshToken) {
			localStorage.setItem("refreshToken", refreshToken);
		}
	}, [refreshToken]);

	let refreshTimeout: NodeJS.Timeout | null = null;

	useEffect(() => {
		if (startRefreshTimeout) {
			console.log("start timeout");
			refreshTimeout = setTimeout(() => {
				refreshTokenHandler();
			}, timeOutMiliSecond);
			setStartRefreshTimeout(false);
		}
	}, [startRefreshTimeout]);

	useEffect(() => {
		localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));

		if (isLoggedIn) {
			console.log("start timeout");
			refreshTimeout = setTimeout(() => {
				refreshTokenHandler();
			}, timeOutMiliSecond);
		} else {
		}
	}, [isLoggedIn]);

	useEffect(() => {
		console.log("isLoggedIn : " + isLoggedIn);
		if (!isLoggedIn) {
			console.log("clear auto refresh timeout");
			if (refreshTimeout !== null) {
				clearTimeout(refreshTimeout);
			}
		}
	}, [isLoggedIn]);

	const value: AuthContextType = {
		authUser,
		setAuthUser,
		isLoggedIn,
		setIsLoggedIn,
		accessToken,
		setAccessToken,
		refreshToken,
		setRefreshToken,
	};

	return (
		<AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
	);
}
