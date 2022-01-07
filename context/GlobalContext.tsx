import React, { createContext, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { UserType, DecodedTokenType } from '../types/Types';

export const GlobalContext = createContext<{
    user: UserType | null
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>
}>({
    user: null,
    setUser: () => { },
});

const getInitialState = (): UserType | null => {
    if (typeof localStorage !== "undefined") {
        const token = localStorage.getItem("token"); 
        if (token) {
            const decodedToken: DecodedTokenType = jwtDecode(token);

            if (decodedToken.exp * 1000 < Date.now()) {
                localStorage.removeItem("token");
                return null;
            };
            
            return {
                id: decodedToken.id,
                username: decodedToken.username,
                roleId: decodedToken.roleId,
                roleName: decodedToken.roleName,
                token
            }
        }
    };
    return null;
};

type ProviderProps = { children: React.ReactNode };
export const GlobalProvider = (props: ProviderProps) => {
    const { children } = props

    const [user, setUser] = useState<UserType | null>(getInitialState());
    console.log(user)
    return <GlobalContext.Provider value={{ user, setUser }}>
        {children}
    </GlobalContext.Provider>
};