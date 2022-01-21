import { STORED_PROCEDURES } from "../const/StoredProcedures";

export type CallSPParams = GetComponentList | AddArticleComponent | AddArticle | EditMetadata | AddCategory | EditCategory | DeleteCategory | RegisterUser | LoginUser | AddComment | AddVisit | GetCommentReplies | GetArticleComments | GetArticleComponents | GetMetadata | GetSearchedArticleCount | GetCategoryArticleCount | GetTotalArticleCount | GetCategories | GetAllArticles | GetSingleArticle | GetLatestArticles | GetMostVisitedArticles | GetCategoryArticles | GetRelatedArticles | GetSearchedArticles | GetAdjacentArticles;

// Articles

type GetAllArticles = {
    procedure: STORED_PROCEDURES.GET_ALL_ARTICLES,
    values: []
};

type GetSingleArticle = {
    procedure: STORED_PROCEDURES.GET_SINGLE_ARTICLE,
    values: [string]
};

type GetLatestArticles = {
    procedure: STORED_PROCEDURES.GET_LATEST_ARTICLES,
    values: [string]
};

type GetMostVisitedArticles = {
    procedure: STORED_PROCEDURES.GET_MOST_VISITED_ARTICLES,
    values: [number]
};

type GetCategoryArticles = {
    procedure: STORED_PROCEDURES.GET_CATEGORY_ARTICLES,
    values: [number]
};

type GetRelatedArticles = {
    procedure: STORED_PROCEDURES.GET_RELATED_ARTICLES,
    values: [number, number]
};

type GetSearchedArticles = {
    procedure: STORED_PROCEDURES.GET_SEARCHED_ARTICLES,
    values: [string]
};

type GetAdjacentArticles = {
    procedure: STORED_PROCEDURES.GET_ADJACENT_ARTICLES,
    values: [number]
};

type AddVisit = {
    procedure: STORED_PROCEDURES.ADD_VISIT,
    values: [number]
};

type AddArticle = {
    procedure: STORED_PROCEDURES.ADD_ARTICLE,
    values: [string, number, number, string, string, number, string, string]
};

// Categories

type GetCategories = {
    procedure: STORED_PROCEDURES.GET_CATEGORIES,
    values: []
};

type AddCategory = {
    procedure: STORED_PROCEDURES.ADD_CATEGORY,
    values: [string, string]
};

type EditCategory = {
    procedure: STORED_PROCEDURES.EDIT_CATEGORY,
    values: [number, string, string]
};

type DeleteCategory = {
    procedure: STORED_PROCEDURES.DELETE_CATEGORY,
    values: [number]
};

// Count

type GetTotalArticleCount = {
    procedure: STORED_PROCEDURES.GET_TOTAL_ARTICLE_COUNT,
    values: []
};

type GetCategoryArticleCount = {
    procedure: STORED_PROCEDURES.GET_CATEGORY_ARTICLE_COUNT,
    values: [number]
};

type GetSearchedArticleCount = {
    procedure: STORED_PROCEDURES.GET_SEARCHED_ARTICLE_COUNT,
    values: [string]
};

// Metadata

type GetMetadata = {
    procedure: STORED_PROCEDURES.GET_METADATA,
    values: []
};

type EditMetadata = {
    procedure: STORED_PROCEDURES.EDIT_METADATA,
    values: [number, string, string]
}

// Article components

type GetArticleComponents = {
    procedure: STORED_PROCEDURES.GET_ARTICLE_COMPONENTS,
    values: [number]
};

type AddArticleComponent = {
    procedure: STORED_PROCEDURES.ADD_ARTICLE_COMPONENT,
    values: [number, number, number, string, string, string, string]
};

type GetComponentList = {
    procedure: STORED_PROCEDURES.GET_COMPONENT_LIST,
    values: []
};

// Comments

type GetArticleComments = {
    procedure: STORED_PROCEDURES.GET_ARTICLE_COMMENTS,
    values: [number]
};

type GetCommentReplies = {
    procedure: STORED_PROCEDURES.GET_COMMENT_REPLIES,
    values: [number]
};

type AddComment = {
    procedure: STORED_PROCEDURES.ADD_COMMENT,
    values: [string, string, string, string, number, 'Y' | 'N', number| null]
};

// Users 

type RegisterUser = {
    procedure: STORED_PROCEDURES.REGISTER_USER,
    values: [string, string, string];
};

type LoginUser = {
    procedure: STORED_PROCEDURES.LOGIN_USER,
    values: [string];
};