import executeQuery from "../dbConfig";
import { hi } from "./Mutations/hi";
import { hello } from "./Querys/hello";

export const resolvers = {
    Query: {
        hello,
    },
    Mutation: {
        hi,
    }
};