import { any } from "cypress/types/bluebird";
import { STORED_PROCEDURES } from "../../const/StoredProcedures";
import { callSP } from "../../dbConfig";
import { UserRoles } from "../../types/Types";
import { formatId } from "../../utils/formatId";

type Args = {
    categoryId: string | number
    categoryName: string
    categoryPath: string
    userRole: string
};

export const addCategory = async (_: any, args: Args) => {
    const { categoryName, categoryPath } = args;

    const procedure: STORED_PROCEDURES = STORED_PROCEDURES.ADD_CATEGORY;
    const values: [string, string] = [categoryName, categoryPath];

    try {
        const newCategory = await callSP({ procedure, values });
        return newCategory[0];
    }
    catch (err: any) {
        throw new Error(err)
    }
};

export const editCategory = async (_: any, args: Args) => {
    const { categoryId, categoryName, categoryPath } = args;

    const procedure: STORED_PROCEDURES = STORED_PROCEDURES.EDIT_CATEGORY;
    const values: [number, string, string] = [formatId(categoryId), categoryName, categoryPath];
    try {
        const newCategory = await callSP({ procedure, values });
        return newCategory[0];
    }
    catch (err: any) {
        throw new Error(err)
    }
};

export const deleteCategory = async (_: any, args: Args) => {
    const { categoryId, userRole } = args;

    if (userRole !== UserRoles.ADMIN) throw new Error("You are not authorized to delete a category");

    const procedure: STORED_PROCEDURES = STORED_PROCEDURES.DELETE_CATEGORY;
    const values: [number] = [formatId(categoryId)];

    try {
        await callSP({ procedure, values });
        return 'Category deleted'
    }
    catch (err: any) {
        throw new Error(err)
    }
};