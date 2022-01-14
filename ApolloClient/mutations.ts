import { gql } from "@apollo/client";

// Articles

export const ADD_VISIT = gql`
    mutation Mutation ($articleId: ID!) {
        addVisit(articleId: $articleId)
    }
`;

// Categories

export const ADD_CATEGORY = gql`
    mutation Mutation ($categoryName: String!, $categoryPath: String!){
        addCategory(categoryName: $categoryName, categoryPath: $categoryPath){
            id
            name
            path
        }
    }
`;

export const EDIT_CATEGORY = gql`
    mutation Mutation ($categoryId: ID!, $categoryName: String!, $categoryPath: String!){
        editCategory(categoryId: $categoryId, categoryName: $categoryName, categoryPath: $categoryPath){
            id
            name
            path
        }
    }
`;

export const DELETE_CATEGORY = gql`
    mutation Mutation ($categoryId: ID!){
        deleteCategory(categoryId: $categoryId)
    }
`;

// Comments

export const ADD_COMMENT = gql`
    mutation Mutation($articleId: ID!, $commenter: String!, $email: String!, $website: String, $body: String!, $isResponse: String!, $isResponseToCommentId: ID){
        addComment(articleId: $articleId, commenter: $commenter, email: $email, website: $website, body: $body, isResponse: $isResponse, isResponseToCommentId: $isResponseToCommentId){
            id
            author
            createdAt
            body
        }
    }
`;

// Users
export const REGISTER_USER = gql`
    mutation Mutation($username: String!, $email: String!, $password: String!) {
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
    mutation Mutation($email: String!, $password: String!) {
        loginUser(email: $email, password: $password){
            id
            username
            roleId
            roleName
            token
        }
    }
`;

// Metadata

export const EDIT_METADATA = gql`
    mutation Mutation($id: ID!, $name: String!, $value: String!){
        editMetadata(id: $id, name: $name, value: $value){
            id
            name
            value
        }
    }
`;