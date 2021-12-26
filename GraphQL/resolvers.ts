import { getSingleArticle, getLatestArticles, getMostVisitedArticles, getCategoryArticles, getRelatedArticles, getSearchedArticles } from "./Querys";
import { hi } from "./Mutations/hi";

export const resolvers = {
    Query: {
        getSingleArticle,
        getLatestArticles, 
        getMostVisitedArticles,
        getCategoryArticles,
        getRelatedArticles,
        getSearchedArticles
    },
    Mutation: {
        hi,
    }
};