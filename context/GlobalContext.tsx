import React, { createContext, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { UserType, DecodedTokenType, ModalInfoType, ModalActions, ToastInfoType } from '../types/Types';

export const GlobalContext = createContext<{
    user: UserType | null
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>
    modalInfo: ModalInfoType
    setModalInfo: React.Dispatch<React.SetStateAction<ModalInfoType>>
    toastInfo: ToastInfoType,
    setToastInfo: React.Dispatch<React.SetStateAction<ToastInfoType>>
}>({
    user: null,
    setUser: () => { },
    modalInfo: { open: false, action: null, title: '' },
    setModalInfo: () => { },
    toastInfo: { open: false, message: '', type: 'success' },
    setToastInfo: () => { }
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

export const GlobalProvider = (props: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(getInitialState());
    const [modalInfo, setModalInfo] = useState<ModalInfoType>({ open: false, action: null, title: '' });
    const [toastInfo, setToastInfo] = useState<ToastInfoType>({ open: false, message: '', type: 'error' });

    return <GlobalContext.Provider value={{ user, setUser, modalInfo, setModalInfo, toastInfo, setToastInfo }}>
        {props.children}
    </GlobalContext.Provider>
};