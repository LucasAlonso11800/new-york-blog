import { callSP } from "../../dbConfig";
// Const
import { STORED_PROCEDURES } from "../../const/StoredProcedures";

export const getMetadata = async () => {
    const procedure: STORED_PROCEDURES = STORED_PROCEDURES.GET_METADATA;
    const metadata = await callSP({ procedure, values: [] });
    return metadata;
};