export enum STORED_PROCEDURES {
        // Articles
    GET_ALL_ARTICLES = 'GetAllArticles',
    GET_SINGLE_ARTICLE = 'GetSingleArticle',
    GET_LATEST_ARTICLES = 'GetLatestArticles',
    GET_MOST_VISITED_ARTICLES = 'GetMostVisitedArticles',
    GET_CATEGORY_ARTICLES = 'GetCategoryArticles',
    GET_RELATED_ARTICLES = 'GetRelatedArticles',
    GET_SEARCHED_ARTICLES = 'GetSearchedArticles',
    GET_ADJACENT_ARTICLES = 'GetAdjacentArticles',
    ADD_VISIT = 'AddVisit',
        // Categories
    GET_CATEGORIES = 'GetCategories',
        // Count
    GET_TOTAL_ARTICLE_COUNT = 'GetTotalArticleCount',
    GET_CATEGORY_ARTICLE_COUNT = 'GetCategoryArticleCount',
    GET_SEARCHED_ARTICLE_COUNT = 'GetSearchedArticleCount',
        // Metadata
    GET_METADATA = 'GetMetadata',
        // Article components
    GET_ARTICLE_COMPONENTS = 'GetArticleComponents',
        // Comments
    GET_ARTICLE_COMMENTS = 'GetArticleComments',
    GET_COMMENT_REPLIES = 'GetCommentReplies',
    ADD_COMMENT = 'AddComment',
        // Users
    REGISTER_USER = 'RegisterUser',
    LOGIN_USER = 'LoginUser',
};