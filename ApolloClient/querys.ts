import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { gql } from "apollo-server-micro";
import { MetadataType } from "../types/Types";

// Articles

export async function getAllArticles(client: ApolloClient<NormalizedCacheObject>) {
    return await client.query({
        query: gql`
            query Query {
                getAllArticles {
                    id
                    slug
                }
            }
        `
    });
};

export const GET_SINGLE_ARTICLE = gql`
query Query ($slug: String!){
    getSingleArticle(slug: $slug){
        id
        title
        categoryId
        categoryName
        categoryPath
        image
        authorName
        createdAt
    }
}
`;
export async function getSingleArticle(client: ApolloClient<NormalizedCacheObject>, slug: string) {
    return await client.query({
        query: GET_SINGLE_ARTICLE,
        variables: {
            slug
        }
    });
};

export const GET_LATEST_ARTICLES = gql`
query Query ($index: Int!){
    getLatestArticles(index: $index){
        id
        title
        categoryName
        categoryPath
        image
        authorName
        slug
        description
    }
}
`;
export async function getLatestArticles(client: ApolloClient<NormalizedCacheObject>, index: number) {
    return await client.query({
        query: GET_LATEST_ARTICLES,
        variables: {
            index
        }
    });
};

export const GET_MOST_VISITED_ARTICLES = gql`
query Query {
    getMostVisitedArticles {
        id
        title
        image
        slug
    }
}
`;
export async function getMostVisitedArticles(client: ApolloClient<NormalizedCacheObject>,) {
    return await client.query({
        query: GET_MOST_VISITED_ARTICLES
    });
};

export const GET_CATEGORY_ARTICLES = gql`
query Query ($categoryId: ID!, $index: Int!){
    getCategoryArticles(categoryId: $categoryId, index: $index){
        id
        title
        image
        slug
    }
}`;

export async function getCategoryArticles(client: ApolloClient<NormalizedCacheObject>, categoryId: string, index: number) {
    return await client.query({
        query: GET_CATEGORY_ARTICLES,
        variables: {
            categoryId,
            index
        }
    });
};

export const GET_SEARCHED_ARTICLES = gql`
query Query ($search: String!, $index: Int!){
    getSearchedArticles(search: $search, index: $index){
        id
        title
        categoryName
        categoryPath
        image
        authorName
        slug
        description
    }
}`;
export async function getSearchedArticles(client: ApolloClient<NormalizedCacheObject>, search: string, index: number) {
    return await client.query({
        query: GET_SEARCHED_ARTICLES,
        variables: {
            search,
            index
        }
    });
};

export const GET_RELATED_ARTICLES =gql`
query Query ($categoryId: ID!){
    getRelatedArticles(categoryId: $categoryId){
        id
        title
        image
        slug
    }
}
`;
export async function getRelatedArticles(client: ApolloClient<NormalizedCacheObject>, categoryId: string) {
    return await client.query({
        query: GET_RELATED_ARTICLES,
        variables: {
            categoryId,
        }
    });
};

export const GET_ADJACENT_ARTICLES = gql`
query Query ($id: ID!){
    getAdjacentArticles(id: $id){
        id
        slug
        title
    }
}`;
export async function getAdjacentArticles(client: ApolloClient<NormalizedCacheObject>, id: string) {
    return await client.query({
        query: GET_ADJACENT_ARTICLES,
        variables: {
            id
        }
    });
};

// Count

export async function getTotalArticleCount(client: ApolloClient<NormalizedCacheObject>,) {
    return await client.query({
        query: gql`
            query Query {
                getTotalArticleCount
            } 
        `
    });
};

export async function getCategoryArticleCount(client: ApolloClient<NormalizedCacheObject>, categoryId: string) {
    return await client.query({
        query: gql`
            query Query ($categoryId: ID!) {
                getCategoryArticleCount (categoryId: $categoryId)
            } 
        `,
        variables: {
            categoryId
        }
    });
};

export async function getSearchedArticleCount(client: ApolloClient<NormalizedCacheObject>, search: string) {
    return await client.query({
        query: gql`
            query Query ($search: String!){
                getSearchedArticleCount(search: $search)
            } 
        `,
        variables: {
            search
        }
    });
};

// Categories

export const GET_CATEGORIES = gql`
query Query {
    getCategories {
        id
        name
        path
    }
}
`;
export async function getCategories(client: ApolloClient<NormalizedCacheObject>) {
    return await client.query({
        query: GET_CATEGORIES
    });
};

// Article Components

export const GET_ARTICLE_COMPONENTS = gql`
query Query ($articleId: ID!) {
    getArticleComponents(articleId: $articleId) {
        id
        componentName
        order
        image
        text
        fontWeight
        textAlign
    }
}`;
export async function getArticleComponents(client: ApolloClient<NormalizedCacheObject>, articleId: string) {
    return await client.query({
        query: GET_ARTICLE_COMPONENTS,
        variables: {
            articleId
        }
    });
};

// Metadata

export const GET_METADATA = gql`
query Query {
    getMetadata {
        id
        name
        value
    }
}`;
export async function getMetadata(client: ApolloClient<NormalizedCacheObject>,) {
    return await client.query({
        query: GET_METADATA
    });
};

// Comments

export const GET_ARTICLE_COMMENTS = gql`
    query Query ($articleId: ID!) {
        getArticleComments(articleId: $articleId){
            id
            author
            createdAt
            body
        } 
    }
`;

export async function getArticleComments(client: ApolloClient<NormalizedCacheObject>, articleId: string) {
    return await client.query({
        query: GET_ARTICLE_COMMENTS,
        variables: {
            articleId
        }
    })
};

export const GET_COMMENT_REPLIES = gql`
    query Query ($commentId: ID!) {
        getCommentReplies(commentId: $commentId){
            id
            author
            createdAt
            body
        }
    }
`;