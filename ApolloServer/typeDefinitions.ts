import { gql } from "apollo-server-micro";

export const typeDefs = gql`
    type Query {
        # Articles
        getAllArticles: [Article]
        getSingleArticle(slug: String!): Article
        getLatestArticles(index: Int!): [Article]
        getMostVisitedArticles: [Article]
        getCategoryArticles(categoryId: ID!, index: Int!): [Article]
        getRelatedArticles(categoryId: ID!): [Article]
        getSearchedArticles(search: String!, index: Int!): [Article]
        getTotalArticleCount: Int
        # Categories
        getCategories: [Category]
        # ArticleComponents
        getArticleComponents(articleId: ID!): [ArticleComponent]
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
        categoryPath: String
        image: String
        createdAt: String
        authorId: Int
        authorName: String
        slug: String
    }
    
    type Category {
        id: ID
        name: String
        path: String
    }

    type ArticleComponent {
        id: ID,
        componentId: ID,
        componentName: String,
        articleId: ID,
	    order: Int,
	    image: String,
	    text: String,
	    fontWeight: String,
	    textAlign: String
    }
`;