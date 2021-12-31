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
        getAdjacentArticles(id: ID!): [Article]
        # Counts
        getTotalArticleCount: Int,
        getCategoryArticleCount(categoryId: ID!): Int
        getSearchedArticleCount(search: String!): Int
        # Categories
        getCategories: [Category]
        # ArticleComponents
        getArticleComponents(articleId: ID!): [ArticleComponent]
        # Metadata
        getMetadata: [Metadata] 
        # Comments
        getArticleComments(articleId: ID!): [Comment]
        getCommentReplies(commentId: ID!): [Comment]
    }

    type Mutation {
        # Articles
        addVisit(articleId: ID!): String
        # Comments
        addComment(articleId: ID!, commenter: String!, email: String!, body: String!, isResponse: String!, isResponseToCommentId: ID): Comment
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
        description: String
    }
    
    type Category {
        id: ID
        name: String
        path: String
    }

    type ArticleComponent {
        id: ID
        componentId: ID
        componentName: String
        articleId: ID
	    order: Int
	    image: String
	    text: String
	    fontWeight: String
	    textAlign: String
    }

    type Metadata {
        id: ID
        name: String
        description: String
        value: String
    }

    type Comment {
        id: ID
        author: String
        createdAt: String
        body: String
    }
`;