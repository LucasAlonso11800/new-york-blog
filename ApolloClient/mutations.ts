import { gql } from "@apollo/client";

// Articles

export const ADD_VISIT = gql`
    mutation Mutation ($articleId: ID!) {
        addVisit(articleId: $articleId)
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