import { getSingleArticle, getLatestArticles, getMostVisitedArticles, getCategoryArticles, getRelatedArticles, getSearchedArticles, getCategories, getTotalArticleCount, getCategoryArticleCount, getSearchedArticleCount, getAllArticles, getArticleComponents, getMetadata, getArticleComments, getCommentReplies, getAdjacentArticles } from "./Querys";
import { hi } from "./Mutations/hi";

export const resolvers = {
    Query: {
        // Articles
        getAllArticles,
        getSingleArticle,
        getLatestArticles, 
        getMostVisitedArticles,
        getCategoryArticles,
        getRelatedArticles,
        getSearchedArticles,
        getAdjacentArticles,
        // Count
        getTotalArticleCount,
        getCategoryArticleCount,
        getSearchedArticleCount,
        // Categories
        getCategories,
        // Article Components
        getArticleComponents,
        // Metadata
        getMetadata,
        // Comments
        getArticleComments,
        getCommentReplies
    },
    Mutation: {
        hi,
    }
};