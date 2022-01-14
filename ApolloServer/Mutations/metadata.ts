import { STORED_PROCEDURES } from "../../const/StoredProcedures";
import { callSP } from "../../dbConfig";
import { MetadataType } from "../../types/Types";
import { formatId } from "../../utils/formatId";

type Args = {
    id: string | number
    name: string
    value: string
};

export const editMetadata = async (_: any, args: Args) => {
    const { id, name, value } = args;
    
    try {
        const procedure: STORED_PROCEDURES = STORED_PROCEDURES.EDIT_METADATA;
        const values: [number, string, string] = [formatId(id), name, value];

        const newMetadata: MetadataType[] = await callSP({ procedure, values });
        return newMetadata[0];
    }
    catch (err: any) {
        throw new Error(err)
    }
};