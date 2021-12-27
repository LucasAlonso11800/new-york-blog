import { getSingleArticle, getLatestArticles, getMostVisitedArticles, getCategoryArticles, getRelatedArticles, getSearchedArticles, getCategories, getTotalArticleCount } from "./Querys";
import { hi } from "./Mutations/hi";

export const resolvers = {
    Query: {
        // Articles
        getSingleArticle,
        getLatestArticles, 
        getMostVisitedArticles,
        getCategoryArticles,
        getRelatedArticles,
        getSearchedArticles,
        getTotalArticleCount,
        // Categories
        getCategories
    },
    Mutation: {
        hi,
    }
};