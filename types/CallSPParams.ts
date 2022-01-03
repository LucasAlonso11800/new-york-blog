import { STORED_PROCEDURES } from "../const/StoredProcedures";

export type CallSPParams = GetCategories | GetAllArticles | GetSingleArticle | GetLatestArticles | GetMostVisitedArticles | GetCategoryArticles | GetRelatedArticles | GetSearchedArticles | GetAdjacentArticles;

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
    values: []
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

// Categories

type GetCategories = {
    procedure: STORED_PROCEDURES.GET_CATEGORIES,
    values: []
};