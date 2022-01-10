import { callSP } from "../../dbConfig";
// Const
import { STORED_PROCEDURES } from "../../const/StoredProcedures";
// Utils
import { formatId } from "../../utils/formatId";

type Args = {
    articleId: string | number
    commentId: string | number
};

export const getArticleComments = async (_: any, args: Args) => {
    const { articleId } = args

    const procedure: STORED_PROCEDURES = STORED_PROCEDURES.GET_ARTICLE_COMMENTS;
    const values: [number] = [formatId(articleId)];

    const comments = await callSP({ procedure, values });
    return comments;
};

export const getCommentReplies = async (_: any, args: Args) => {
    const { commentId } = args;

    const procedure: STORED_PROCEDURES = STORED_PROCEDURES.GET_COMMENT_REPLIES;
    const values: [number] = [formatId(commentId)];

    const comments = await callSP({ procedure, values });
    return comments;
};