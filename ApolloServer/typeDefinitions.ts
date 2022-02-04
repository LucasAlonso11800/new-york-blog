import { gql } from "apollo-server-micro";

export const typeDefs = gql`
    type Query {
        # Articles
        getAllArticles(statusName: String!): [Article]
        getSingleArticle(slug: String!): Article
        getLatestArticles(index: Int!, statusName: String!): [Article]
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
        getComponentsList: [Component]
        getArticleComponents(articleId: ID!): [ArticleComponent]
        # Metadata
        getMetadata: [Metadata] 
        # Comments
        getArticleComments(articleId: ID!): [Comment]
        getCommentReplies(commentId: ID!): [Comment]
        # Users
        getUsers: [User]
    }

    type Mutation {
        # Articles
        addVisit(articleId: ID!): String
        addArticle(userId: ID!, userRole: String!, title: String!, categoryId: ID!, components: [ArticleComponentInput]!, image: String!, slug: String!): [Article]
        editArticle(articleId: ID!, title: String!, categoryId: ID!, components: [ArticleComponentInput]!, image: String!, slug: String!, slugChanged: Boolean!): Article
        deleteArticle(articleId: ID!, userId: ID!, userRole: String!, authorId: ID!): String
        approveArticle(articleId: ID!, userRole: String!): String
        # Categories
        addCategory(categoryName: String!, categoryPath: String!): Category
        editCategory(categoryId: ID!, categoryName: String!, categoryPath: String!): Category
        deleteCategory(categoryId: ID!, userRole: String!): String
        # Comments
        addComment(articleId: ID!, commenter: String!, email: String!, website: String, body: String!, isResponse: String!, isResponseToCommentId: ID): Comment
        # Users
        loginUser(email: String!, password: String!): User
        registerUser(username: String!, email: String!, password: String!): User
        changeUserRole(userRole: String!, authorId: ID!, authorRoleName: String!): String
        # Metadata
        editMetadata(id: ID!, name: String!, value: String!): Metadata
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
        statusId: ID
        statusName: String
    }
    
    type Category {
        id: ID
        name: String
        path: String
    }

    type Component {
        id: ID
        name: String
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

    input ArticleComponentInput {
        id: ID
        componentId: ID
        componentName: String
        articleId: ID
	    order: Int
	    image: String
	    text: String
	    fontWeight: String
	    textAlign: String
        typename: String
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

    type User {
        id: ID
        username: String
        token: String
        roleId: ID
        roleName: String
        articles: Int
        visits: Int
    }
`;