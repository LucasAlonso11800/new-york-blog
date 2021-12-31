import { gql } from "@apollo/client";

// Articles

export const ADD_VISIT = gql`
    mutation Mutation ($articleId: ID!) {
        addVisit(articleId: $articleId)
    }
`;

// Comments

export const ADD_COMMENT = gql`
    mutation Mutation($articleId: ID!, $commenter: String!, $email: String!, $body: String!, $isResponse: String!, $isResponseToCommentId: ID){
        addComment(articleId: $articleId, commenter: $commenter, email: $email, body: $body, isResponse: $isResponse, isResponseToCommentId: $isResponseToCommentId){
            id
            author
            createdAt
            body
        }
    }
`;