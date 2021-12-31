import { gql } from "@apollo/client";

export const ADD_VISIT = gql`
    mutation Mutation ($articleId: ID!) {
        addVisit(articleId: $articleId)
    }
`;