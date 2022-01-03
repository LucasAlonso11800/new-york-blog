import { callSP } from "../../dbConfig";
// Const
import { STORED_PROCEDURES } from "../../const/StoredProcedures";
// Types
import { CategoryType } from "../../types/Types";

export const getCategories = async (_: any, args: any) => {
    const procedure: STORED_PROCEDURES = STORED_PROCEDURES.GET_CATEGORIES;

    const categories: CategoryType[] = await callSP({ procedure, values: [] });
    return categories;
};