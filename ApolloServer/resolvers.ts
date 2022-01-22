// Querys
import { getUsers, getComponentsList, getSingleArticle, getLatestArticles, getMostVisitedArticles, getCategoryArticles, getRelatedArticles, getSearchedArticles, getCategories, getTotalArticleCount, getCategoryArticleCount, getSearchedArticleCount, getAllArticles, getArticleComponents, getMetadata, getArticleComments, getCommentReplies, getAdjacentArticles } from "./Querys";
// Mutations
import { changeUserRole, approveArticle, deleteArticle, addArticle, addCategory, addComment, addVisit, deleteCategory, editCategory, editMetadata, loginUser, registerUser } from "./Mutations";

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
        getComponentsList,
        getArticleComponents,
        // Metadata
        getMetadata,
        // Comments
        getArticleComments,
        getCommentReplies,
        // Users
        getUsers
    },
    Mutation: {
        // Articles
        addVisit,
        addArticle,
        deleteArticle,
        approveArticle,
        // Categories
        addCategory,
        editCategory,
        deleteCategory,
        // Comments
        addComment,
        // Users
        loginUser,
        registerUser,
        changeUserRole,
        // Metadata
        editMetadata
    }
};