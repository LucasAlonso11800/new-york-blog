import { gql } from "@apollo/client";
import { COMMENTS_FIELDS, CORE_ARTICLE_FIELDS } from "./fragments";

// Articles

export const ADD_VISIT = gql`
    mutation AddVisit($articleId: ID!) {
        addVisit(articleId: $articleId)
    }
`;

export const ADD_ARTICLE = gql`
    ${CORE_ARTICLE_FIELDS}
    mutation AddArticle(
        $userId: ID!, 
        $userRole: String!, 
        $title: String!, 
        $categoryId: ID!, 
        $components: [ArticleComponentInput]!, 
        $image: String!, 
        $slug: String!
    ){
        addArticle (
            userId: $userId, 
            userRole: $userRole, 
            title: $title, 
            categoryId: $categoryId, 
            components: $components, 
            image: $image, 
            slug: $slug
            )
        {
            ...CoreArticleFields
            categoryName
            categoryPath
            authorName
            createdAt
            description
        }
    }
`;

export const EDIT_ARTICLE = gql`
    mutation EditArticle(
        $articleId: ID!,
        $title: String!, 
        $categoryId: ID!, 
        $components: [ArticleComponentInput]!, 
        $image: String!, 
        $slug: String!,
        $slugChanged: Boolean!
    ){
        editArticle (
            articleId: $articleId,
            title: $title, 
            categoryId: $categoryId, 
            components: $components, 
            image: $image, 
            slug: $slug,
            slugChanged: $slugChanged
            )
        {
            id
            slug
            title
            categoryId
            categoryName
            categoryPath
            image
            visits
            createdAt
            authorId
            authorName
            statusId
            statusName
            description
        }
    }
`;

export const DELETE_ARTICLE = gql`
    mutation deleteArticle(
        $articleId: ID!,
        $userId: ID!,
        $userRole: String!,
        $authorId: ID!
    ){
        deleteArticle(
            articleId: $articleId,
            userId: $userId,
            userRole: $userRole,
            authorId: $authorId
        )
    }
`;

export const APPROVE_ARTICLE = gql`
    mutation approveArticle($articleId: ID!, $userRole: String!){
        approveArticle(articleId: $articleId, userRole: $userRole)
    }
`;

// Categories

export const ADD_CATEGORY = gql`
    mutation AddCategory($categoryName: String!, $categoryPath: String!){
        addCategory(categoryName: $categoryName, categoryPath: $categoryPath){
            id
            name
            path
        }
    }
`;

export const EDIT_CATEGORY = gql`
    mutation EditCategory($categoryId: ID!, $categoryName: String!, $categoryPath: String!){
        editCategory(categoryId: $categoryId, categoryName: $categoryName, categoryPath: $categoryPath){
            id
            name
            path
        }
    }
`;

export const DELETE_CATEGORY = gql`
    mutation DeleteCategory($categoryId: ID!, $userRole: String!){
        deleteCategory(categoryId: $categoryId, userRole: $userRole)
    }
`;

// Comments

export const ADD_COMMENT = gql`
    ${COMMENTS_FIELDS}
    mutation AddComment($articleId: ID!, $commenter: String!, $email: String!, $website: String, $body: String!, $isResponse: String!, $isResponseToCommentId: ID){
        addComment(articleId: $articleId, commenter: $commenter, email: $email, website: $website, body: $body, isResponse: $isResponse, isResponseToCommentId: $isResponseToCommentId){
            ...CommentFields
        }
    }
`;

// Users
export const REGISTER_USER = gql`
    mutation RegisterUser($username: String!, $email: String!, $password: String!) {
        registerUser(username: $username, email: $email, password: $password){
            id
            username
            roleId
            roleName
            token
        }
    }
`;

export const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password){
            id
            username
            roleId
            roleName
            token
        }
    }
`;

export const CHANGE_USER_ROLE = gql`
    mutation ChangeUserRole($userRole: String!, $authorId: ID!, $authorRoleName: String!) {
        changeUserRole(userRole: $userRole, authorId: $authorId, authorRoleName: $authorRoleName)
    }
`;

// Metadata

export const EDIT_METADATA = gql`
    mutation EditMetadata($id: ID!, $name: String!, $value: String!){
        editMetadata(id: $id, name: $name, value: $value){
            id
            name
            value
        }
    }
`;