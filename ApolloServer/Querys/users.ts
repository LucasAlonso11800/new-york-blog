import { STORED_PROCEDURES } from "../../const/StoredProcedures";
import { callSP } from "../../dbConfig";
import { UserType } from "../../types/Types";

export const getUsers = async () => {
    try {
        const procedure: STORED_PROCEDURES = STORED_PROCEDURES.GET_USERS;
        const users: UserType[] = await callSP({ procedure, values: [] });
        return users;
    }
    catch(err: any){
        throw new Error(err)
    }
};