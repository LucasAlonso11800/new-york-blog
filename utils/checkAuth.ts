import { UserType } from "../types/Types";

export const checkAuth = (user: UserType | null): void => { 
    if (user === null && typeof window !== 'undefined') window.location.assign('/admin/login')
};