import { getSingleArticle, getLatestArticles, getMostVisitedArticles, getCategoryArticles, getRelatedArticles, getSearchedArticles, getCategories, getTotalArticleCount, getCategoryArticleCount, getAllArticles, getArticleComponents, getMetadata } from "./Querys";
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
        // Count
        getTotalArticleCount,
        getCategoryArticleCount,
        // Categories
        getCategories,
        // Article Components
        getArticleComponents,
        // Metadata
        getMetadata
    },
    Mutation: {
        hi,
    }
};