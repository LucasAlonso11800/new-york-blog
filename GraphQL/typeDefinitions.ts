import { gql } from "apollo-server-micro";

export const typeDefs = gql`
    type Query {
        hello: String
    }

    type Mutation {
        hi: String
    }
`;