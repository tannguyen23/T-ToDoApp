export type AuthUser = {
    id : string,
    name : string,
    password? : string,
}
export type AuthContextType = {
    authUser : AuthUser | null,
    setAuthUser : React.Dispatch<React.SetStateAction<AuthUser | null>>,
    isLoggedIn : boolean,
    setIsLoggedIn : React.Dispatch<React.SetStateAction<boolean>>,
}
