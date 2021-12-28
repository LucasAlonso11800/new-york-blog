import executeQuery from "../../dbConfig";
import { ARTICLE_LIMIT_PER_PAGE, CATEGORY_ARTICLE_LIMIT, FAVORITE_ARTICLE_LIMIT, RELATED_ARTICLE_LIMIT } from "../../const/Limits";
import { ArticleType, CountType } from "../../types/Types";

type Args = {
    id: number | string
    index: number
    categoryId: number | string
    search: string
    slug: string
};

export const getAllArticles = async () => {
    const query: string = `
        SELECT         
            article_id AS id,
            article_title AS title,
            article_visits AS visits,
            article_category_id AS categoryId,
            category_name AS categoryName,
            category_path AS categoryPath,
            article_main_image AS image,
            article_created_at AS createdAt,
            article_user_id AS authorId,
            user_username AS authorName,
            article_slug AS slug
        FROM articles
        JOIN categories
            ON categories.category_id = article_category_id
        JOIN users
            ON users.user_id = article_user_id
    `;
    const articles: ArticleType[] = await executeQuery(query, []);
    return articles;
};

export const getSingleArticle = async (_: any, args: Args) => {
    const { slug } = args;

    const query: string = `
        SELECT         
            article_id AS id,
            article_title AS title,
            article_visits AS visits,
            article_category_id AS categoryId,
            category_name AS categoryName,
            category_path AS categoryPath,
            article_main_image AS image,
            article_created_at AS createdAt,
            article_user_id AS authorId,
            user_username AS authorName,
            article_slug AS slug
        FROM articles
        JOIN categories
            ON categories.category_id = article_category_id
        JOIN users
            ON users.user_id = article_user_id
        WHERE article_slug = ?
    `;
    const values: [string] = [slug];
    const article: ArticleType[] = await executeQuery(query, values);
    return article[0];
};

export const getLatestArticles = async (_: any, args: Args) => {
    const { index } = args;

    const query: string = `
        SELECT         
            article_id AS id,
            article_title AS title,
            article_visits AS visits,
            article_category_id AS categoryId,
            category_name AS categoryName,
            category_path AS categoryPath,
            article_main_image AS image,
            article_created_at AS createdAt,
            article_user_id AS authorId,
            user_username AS authorName,
            article_slug AS slug,
            article_component_text AS description
            FROM articles
            JOIN categories
                ON categories.category_id = article_category_id
            JOIN users
                ON users.user_id = article_user_id
            LEFT JOIN article_components
                ON article_components.article_component_article_id = article_id 
                AND article_components.article_component_order = 2
            ORDER BY article_created_at DESC, article_id DESC
        `;

    const articles: ArticleType[] = await executeQuery(query, []);
    return articles.slice((index - 1) * ARTICLE_LIMIT_PER_PAGE, (index - 1) * ARTICLE_LIMIT_PER_PAGE + ARTICLE_LIMIT_PER_PAGE);
};

export const getMostVisitedArticles = async () => {
    const query: string = `
        SELECT         
            article_id AS id,
            article_title AS title,
            article_visits AS visits,
            article_category_id AS categoryId,
            category_name AS categoryName,
            category_path AS categoryPath,
            article_main_image AS image,
            article_created_at AS createdAt,
            article_user_id AS authorId,
            user_username AS authorName,
            article_slug AS slug
        FROM articles
        JOIN categories
            ON categories.category_id = article_category_id
        JOIN users
            ON users.user_id = article_user_id
        ORDER BY article_visits DESC
        LIMIT ? 
    `;

    const values: [number] = [FAVORITE_ARTICLE_LIMIT];
    const articles: ArticleType[] = await executeQuery(query, values);
    return articles;
};

export const getCategoryArticles = async (_: any, args: Args) => {
    const { categoryId, index } = args;

    const query: string = `
        SELECT         
            article_id AS id,
            article_title AS title,
            article_visits AS visits,
            article_category_id AS categoryId,
            category_name AS categoryName,
            category_path AS categoryPath,
            article_main_image AS image,
            article_created_at AS createdAt,
            article_user_id AS authorId,
            user_username AS authorName,
            article_slug AS slug
        FROM articles
        JOIN categories
            ON categories.category_id = article_category_id
        JOIN users
            ON users.user_id = article_user_id
        WHERE article_category_id = ?
        ORDER BY article_created_at DESC, article_id DESC
    `;

    const values: [number] = [typeof categoryId === 'number' ? categoryId : parseInt(categoryId)];
    const articles: ArticleType[] = await executeQuery(query, values);

    return articles.slice((index - 1) * CATEGORY_ARTICLE_LIMIT, (index - 1) * CATEGORY_ARTICLE_LIMIT + CATEGORY_ARTICLE_LIMIT);
};

export const getRelatedArticles = async (_: any, args: Args) => {
    const { categoryId } = args;

    const query: string = `
        SELECT         
            article_id AS id,
            article_title AS title,
            article_visits AS visits,
            article_category_id AS categoryId,
            category_name AS categoryName,
            category_path AS categoryPath,
            article_main_image AS image,
            article_created_at AS createdAt,
            article_user_id AS authorId,
            user_username AS authorName,
            article_slug AS slug
        FROM articles
        JOIN categories
            ON categories.category_id = article_category_id
        JOIN users
            ON users.user_id = article_user_id
        WHERE article_category_id = ?
        ORDER BY RAND()
        LIMIT ? 
    `;

    const values: [number, number] = [typeof categoryId === 'number' ? categoryId : parseInt(categoryId), RELATED_ARTICLE_LIMIT];
    const articles: ArticleType[] = await executeQuery(query, values);

    return articles;
};

export const getSearchedArticles = async (_: any, args: Args) => {
    const { search, index } = args;

    const query: string = `
        SELECT         
            article_id AS id,
            article_title AS title,
            article_visits AS visits,
            article_category_id AS categoryId,
            category_name AS categoryName,
            category_path AS categoryPath,
            article_main_image AS image,
            article_created_at AS createdAt,
            article_user_id AS authorId,
            user_username AS authorName,
            article_slug AS slug
        FROM articles
        JOIN categories
            ON categories.category_id = article_category_id
        JOIN users
            ON users.user_id = article_user_id
        WHERE article_title LIKE CONCAT('%', ?, '%')
        ORDER BY article_created_at DESC, article_id DESC
        LIMIT ? 
    `;

    const values: [string] = [search];
    const articles: ArticleType[] = await executeQuery(query, values);

    return articles.slice((index - 1) * ARTICLE_LIMIT_PER_PAGE, (index - 1) * ARTICLE_LIMIT_PER_PAGE + 7);
};