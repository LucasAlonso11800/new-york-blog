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
            article_id as id,
            article_title as title,
            article_visits as visits,
            article_category_id as categoryId,
            category_name as categoryName,
            article_main_image as image,
            article_created_at as createdAt,
            article_user_id as authorId,
            user_username as authorName,
            article_slug as slug
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
            article_id as id,
            article_title as title,
            article_visits as visits,
            article_category_id as categoryId,
            category_name as categoryName,
            article_main_image as image,
            article_created_at as createdAt,
            article_user_id as authorId,
            user_username as authorName,
            article_slug as slug
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

    const getNumberOfArticlesQuery: string = 'SELECT COUNT(*) as count FROM articles';
    const numberOfArticles: CountType[] = await executeQuery(getNumberOfArticlesQuery, []);

    const limit: number = Math.ceil(numberOfArticles[0].count / ARTICLE_LIMIT_PER_PAGE) * index + (ARTICLE_LIMIT_PER_PAGE - 1);
    const query: string = `
        SELECT         
            article_id as id,
            article_title as title,
            article_visits as visits,
            article_category_id as categoryId,
            category_name as categoryName,
            category_path as categoryPath,
            article_main_image as image,
            article_created_at as createdAt,
            article_user_id as authorId,
            user_username as authorName,
            article_slug as slug
        FROM articles
        JOIN categories
            ON categories.category_id = article_category_id
        JOIN users
            ON users.user_id = article_user_id
        ORDER BY article_created_at DESC, article_id DESC
        LIMIT ? 
    `;

    const values: [number] = [limit];
    const articles: ArticleType[] = await executeQuery(query, values);
    return articles.slice((index - 1) * ARTICLE_LIMIT_PER_PAGE, (index - 1) * ARTICLE_LIMIT_PER_PAGE + ARTICLE_LIMIT_PER_PAGE);
};

export const getMostVisitedArticles = async () => {
    const query: string = `
        SELECT         
            article_id as id,
            article_title as title,
            article_visits as visits,
            article_category_id as categoryId,
            category_name as categoryName,
            article_main_image as image,
            article_created_at as createdAt,
            article_user_id as authorId,
            user_username as authorName,
            article_slug as slug
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

    const getNumberOfArticlesQuery: string = 'SELECT COUNT(*) as count FROM articles WHERE article_category_id = ?';
    const numberOfArticles: CountType[] = await executeQuery(getNumberOfArticlesQuery, [typeof categoryId === 'number' ? categoryId : parseInt(categoryId)]);

    const limit: number = Math.ceil(numberOfArticles[0].count / CATEGORY_ARTICLE_LIMIT) * index + (CATEGORY_ARTICLE_LIMIT - 1);

    const query: string = `
        SELECT         
            article_id as id,
            article_title as title,
            article_visits as visits,
            article_category_id as categoryId,
            category_name as categoryName,
            article_main_image as image,
            article_created_at as createdAt,
            article_user_id as authorId,
            user_username as authorName,
            article_slug as slug
        FROM articles
        JOIN categories
            ON categories.category_id = article_category_id
        JOIN users
            ON users.user_id = article_user_id
        WHERE article_category_id = ?
        ORDER BY article_created_at DESC, article_id DESC
        LIMIT ? 
    `;

    const values: [number, number] = [typeof categoryId === 'number' ? categoryId : parseInt(categoryId), limit];
    const articles: ArticleType[] = await executeQuery(query, values);

    return articles.slice((index - 1) * CATEGORY_ARTICLE_LIMIT, (index - 1) * CATEGORY_ARTICLE_LIMIT + CATEGORY_ARTICLE_LIMIT);
};

export const getRelatedArticles = async (_: any, args: Args) => {
    const { categoryId } = args;

    const query: string = `
        SELECT         
            article_id as id,
            article_title as title,
            article_visits as visits,
            article_category_id as categoryId,
            category_name as categoryName,
            article_main_image as image,
            article_created_at as createdAt,
            article_user_id as authorId,
            user_username as authorName,
            article_slug as slug
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

    const getNumberOfArticlesQuery: string = 'SELECT COUNT(*) as count FROM articles';
    const numberOfArticles: CountType[] = await executeQuery(getNumberOfArticlesQuery, []);

    const limit: number = Math.ceil(numberOfArticles[0].count / ARTICLE_LIMIT_PER_PAGE) * index + 6;

    const query: string = `
        SELECT         
            article_id as id,
            article_title as title,
            article_visits as visits,
            article_category_id as categoryId,
            category_name as categoryName,
            article_main_image as image,
            article_created_at as createdAt,
            article_user_id as authorId,
            user_username as authorName,
            article_slug as slug
        FROM articles
        JOIN categories
            ON categories.category_id = article_category_id
        JOIN users
            ON users.user_id = article_user_id
        WHERE article_title LIKE CONCAT('%', ?, '%')
        ORDER BY article_created_at DESC, article_id DESC
        LIMIT ? 
    `;

    const values: [string, number] = [search, limit];
    const articles: ArticleType[] = await executeQuery(query, values);

    return articles.slice((index - 1) * ARTICLE_LIMIT_PER_PAGE, (index - 1) * ARTICLE_LIMIT_PER_PAGE + 7);
};

export const getTotalArticleCount = async () => {
    const query: string = 'SELECT COUNT(*) as count FROM articles';
    const count: CountType[] = await executeQuery(query, []);
    return count[0].count;
};

export const getCategoryArticleCount = async (_: any, args: Args) => {
    const { categoryId } = args;
    const query: string = 'SELECT COUNT(*) as count FROM articles WHERE article_category_id = ?';
    const values: [number] = [typeof categoryId === 'number' ? categoryId : parseInt(categoryId)];
    const count: CountType[] = await executeQuery(query, values);
    return count[0].count;
};