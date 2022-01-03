import { callSP } from "../../dbConfig";
// Const 
import { STORED_PROCEDURES } from "../../const/StoredProcedures";
// Utils
import { formatId } from "../../utils/formatId";

type Args = {
    articleId: string | number
};

export const addVisit = async (_: any, args: Args) => {
    const { articleId } = args;

    const procedure: STORED_PROCEDURES = STORED_PROCEDURES.ADD_VISIT;
    const values: [number] = [formatId(articleId)];

    await callSP({ procedure, values });
    return 'Visit added';
};