export type LoginResponseType = {
	msg: string;
	accessToken: string;
	refreshToken: string;
	user: AuthUser;
};
export type AuthUser = {
	_id?: string;
	id?: string;
	username: string;
	fullname: string;
	email: string;
	address: string;
	avaUrl: string;
};

export type RegisterUser = {
	username: string;
	password: string;
	fullname: string;
	email: string;
	address: string;
	avaUrl: string;
};

export type LoginUser = {
	username: string;
	password: string;
};

export type AuthContextType = {
	authUser: AuthUser | null;
	setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	accessToken: string | null;
	setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
	refreshToken: string | null;
	setRefreshToken: React.Dispatch<React.SetStateAction<string | null>>;
};
