import executeQuery from "../../dbConfig";
import { ArticleComponentType } from "../../types/Types";

type Args = {
    articleId: string | number
};

export const getArticleComponents = async (_: any, args: Args) => {
    const { articleId } = args;
    const query: string = `
        SELECT         
            article_component_id AS id,
            article_component_component_id AS componentId,
            component_name AS componentName,
            article_component_article_id AS articleId,
            article_component_order AS 'order',
            article_component_image AS image,
            article_component_text AS text,
            article_component_font_weight AS fontWeight,
            article_component_text_align AS textAlign
        FROM article_components
        JOIN components 
            ON components.component_id = article_component_component_id
        WHERE article_component_article_id = ?
        ORDER BY article_component_order
    `;
    const values: [number] = [typeof articleId === 'string' ? parseInt(articleId) : articleId]
    const articleComponents: ArticleComponentType[] = await executeQuery(query, values);
    return articleComponents;
};