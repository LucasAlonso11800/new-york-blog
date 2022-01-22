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
    ADD_ARTICLE = 'AddArticle',
    EDIT_ARTICLE = 'EditArticle',
    DELETE_ARTICLE = 'DeleteArticle',
    APPROVE_ARTICLE = 'ApproveArticle',
        // Categories
    GET_CATEGORIES = 'GetCategories',
    ADD_CATEGORY = 'AddCategory',
    EDIT_CATEGORY = 'EditCategory',
    DELETE_CATEGORY = 'DeleteCategory',
        // Count
    GET_TOTAL_ARTICLE_COUNT = 'GetTotalArticleCount',
    GET_CATEGORY_ARTICLE_COUNT = 'GetCategoryArticleCount',
    GET_SEARCHED_ARTICLE_COUNT = 'GetSearchedArticleCount',
        // Metadata
    GET_METADATA = 'GetMetadata',
    EDIT_METADATA = 'EditMetadata',
        // Article components
    GET_ARTICLE_COMPONENTS = 'GetArticleComponents',
    ADD_ARTICLE_COMPONENT = 'AddArticleComponent',
    GET_COMPONENT_LIST = 'GetComponentList',
        // Comments
    GET_ARTICLE_COMMENTS = 'GetArticleComments',
    GET_COMMENT_REPLIES = 'GetCommentReplies',
    ADD_COMMENT = 'AddComment',
        // Users
    REGISTER_USER = 'RegisterUser',
    LOGIN_USER = 'LoginUser',
    GET_USERS = 'GetUsers',
    CHANGE_USER_ROLE = 'ChangeUserRole',
};