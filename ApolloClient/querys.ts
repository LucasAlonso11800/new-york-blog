import { gql } from "apollo-server-micro";
import { client } from "./ApolloConfig";

// Articles

export async function getAllArticles() {
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

export async function getTotalArticleCount() {
    return await client.query({
        query: gql`
            query Query {
                getTotalArticleCount
            } 
        `
    });
};

export async function getSingleArticle(slug: string) {
    return await client.query({
        query: gql`
            query Query ($slug: String!){
                getSingleArticle(slug: $slug){
                    id
                    title
                    categoryName
                    categoryPath
                    image
                    authorName
                }
            }
        `,
        variables: {
            slug
        }
    });
};

export async function getLatestArticles(index: number) {
    return await client.query({
        query: gql`
                query Query ($index: Int!){
                    getLatestArticles(index: $index){
                        id
                        title
                        categoryName
                        categoryPath
                        image
                        authorName
                        slug
                    }
                }
            `,
        variables: {
            index
        }
    });
};

export async function getMostVisitedArticles() {
    return await client.query({
        query: gql`
                query Query {
                    getMostVisitedArticles {
                        id
                        title
                        image
                        slug
                    }
                }
            `
    });
};

export async function getCategoryArticles(categoryId: number, index: number){
    return await client.query({
        query: gql`
            query Query ($categoryId: ID!, $index: Int!){
                getCategoryArticles(categoryId: $categoryId, index: $index){
                    id
                    title
                    image
                    slug
                }
            }
        `,
        variables: {
            categoryId,
            index
        }
    });
};

export async function getCategoryArticleCount(categoryId: number){
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

// Categories

export async function getCategories(){
    return await client.query({
        query: gql`
            query Query {
                getCategories {
                    id
                    name
                    path
                }
            }
        ` 
    });
};

// Article Components

export async function getArticleComponents(articleId: number){
    return await client.query({
        query: gql`
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
            }
        `,
        variables: {
            articleId
        }
    });
};