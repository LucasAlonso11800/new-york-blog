import executeQuery from "../../dbConfig";

type Args = {
    articleId: string | number
    commenter: string
    email: string
    body: string
    isResponse: 'Y' | 'N'
    isResponseToCommentId: string | number | null
};

export const addComment = async (_: any, args: Args) => {
    const { articleId, commenter, email, body, isResponse, isResponseToCommentId } = args;
    const query = `
        INSERT INTO comments (
            comment_commenter,
            comment_email,
            comment_body,
            comment_created_at,
            comment_article_id,
            comment_is_response,
            comment_is_response_to_comment_id
        )
        VALUES (?, ?, ?, CURDATE(), ?, ?, ?)
    `;
    
    const values: [string, string, string, number, 'Y' | 'N', number| null] = [commenter, email, body, typeof articleId === 'number' ? articleId : parseInt(articleId), isResponse, isResponseToCommentId === null ? null : typeof isResponseToCommentId === 'number' ? isResponseToCommentId : parseInt(isResponseToCommentId)];
    const response = await executeQuery(query, values);
        
    const newCommentQuery = `
        SELECT
            comment_id AS id,  
            comment_commenter AS author,
            comment_body AS body,
            comment_created_at AS createdAt,
            comment_article_id AS articleId
        FROM comments
        WHERE comment_id = ?
    `;
    const newComment = await executeQuery(newCommentQuery, [response.insertId])
    return newComment[0];
};