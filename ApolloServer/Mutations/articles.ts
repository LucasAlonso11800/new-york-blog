import executeQuery from "../../dbConfig";

type Args = {
    articleId: string | number
};

export const addVisit = async (_: any, args: Args) => {
    const { articleId } = args;
    
    const query = `
        UPDATE articles 
        SET article_visits = article_visits + 1
        WHERE article_id = ?
    `;
    
    const values: [number] = [typeof articleId === 'number' ? articleId : parseInt(articleId)];
    await executeQuery(query, values);
    return 'Visit added';
};