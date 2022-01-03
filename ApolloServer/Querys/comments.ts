import executeQuery from "../../dbConfig";
// Utils
import { formatId } from "../../utils/formatId";

type Args = {
    articleId: string | number
    commentId: string | number
};

export const getArticleComments = async (_: any, args: Args) => {
    const { articleId } = args
    const query = `
        SELECT
            comment_id AS id,  
            comment_commenter AS author,
            comment_body AS body,
            comment_created_at AS createdAt,
            comment_article_id AS articleId
        FROM comments
        WHERE comment_is_response = 'N'
            AND comment_article_id = ?
        ORDER BY comment_created_at DESC
    `;

    const values: [number] = [formatId(articleId)]
    const comments = await executeQuery(query, values);
    return comments;
};

export const getCommentReplies = async (_: any, args: Args) => {
    const { commentId } = args;

    const query = `
        SELECT
            comment_id AS id,  
            comment_commenter AS author,
            comment_body AS body,
            comment_created_at AS createdAt,
            comment_article_id AS articleId
        FROM comments
        WHERE comment_is_response = 'Y' AND comment_is_response_to_comment_id = ?
        ORDER BY comment_created_at DESC
    `;

    const values: [number] = [formatId(commentId)]
    const comments = await executeQuery(query, values);

    return comments;
};