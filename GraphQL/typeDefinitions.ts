import { gql } from "apollo-server-micro";

export const typeDefs = gql`
    type Query {
        getSingleArticle(id: ID!): Article
        getLatestArticles(index: Int!): [Article]
        getMostVisitedArticles: [Article]
        getCategoryArticles(categoryId: ID!, index: Int!): [Article]
        getRelatedArticles(categoryId: ID!): [Article]
        getSearchedArticles(search: String!, index: Int!): [Article]
    }

    type Mutation {
        hi: String
    }

    type Article {
        id: ID
        title: String
        visits: Int
        categoryId: Int
        categoryName: String
        image: String
        createdAt: String
        authorId: Int
        authorName: String
        slug: String
    }
`;