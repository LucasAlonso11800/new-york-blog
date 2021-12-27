import { gql } from "apollo-server-micro";
import { client } from "../const/ApolloConfig";

export async function getTotalArticleCount() {
    return await client.query({
        query: gql`
            query Query {
                getTotalArticleCount
            } 
        `
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