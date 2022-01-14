import { gql } from '@apollo/client';

export const CORE_ARTICLE_FIELDS = gql`
    fragment CoreArticleFields on Article {
        id
        title
        image
        slug
    }
`;

export const COMMENTS_FIELDS = gql`
    fragment CommentFields on Comment {
        id
        author
        createdAt
        body
    }
`;