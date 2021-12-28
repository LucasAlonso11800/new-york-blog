import { getSingleArticle, getLatestArticles, getMostVisitedArticles, getCategoryArticles, getRelatedArticles, getSearchedArticles, getCategories, getTotalArticleCount, getCategoryArticleCount, getAllArticles, getArticleComponents } from "./Querys";
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
        getTotalArticleCount,
        getCategoryArticleCount,
        // Categories
        getCategories,
        // Article Components
        getArticleComponents,
    },
    Mutation: {
        hi,
    }
};