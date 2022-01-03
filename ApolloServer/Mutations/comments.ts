import { STORED_PROCEDURES } from "../../const/StoredProcedures";
import { callSP } from "../../dbConfig";
// Utils
import { formatId } from "../../utils/formatId";

type Args = {
    articleId: string | number
    commenter: string
    email: string
    body: string
    website: string
    isResponse: 'Y' | 'N'
    isResponseToCommentId: string | number | null
};

export const addComment = async (_: any, args: Args) => {
    const { articleId, commenter, email, body, website, isResponse, isResponseToCommentId } = args;

    const procedure: STORED_PROCEDURES = STORED_PROCEDURES.ADD_COMMENT;
    const values: [string, string, string, string, number, 'Y' | 'N', number | null] = [commenter, email, body, website, formatId(articleId), isResponse, isResponseToCommentId === null ? null : formatId(isResponseToCommentId)];
    
    const response = await callSP({ procedure, values });
    return response[0];
};