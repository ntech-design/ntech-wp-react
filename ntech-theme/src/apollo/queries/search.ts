import { gql } from '@apollo/client';

export const SEARCH_CONTENT = gql`
    query SearchContent($term: String!) {
        posts(where: { search: $term }) {
            nodes {
                __typename
                id
                title
                slug
                excerpt
                date
                postLayout { placement }
                categories {
                    nodes {
                        name
                        slug
                    }
                }
            }
        }
        pages(where: { search: $term }) {
            nodes {
                __typename
                id
                slug
                uri
                content
                wpTemplate
            }
        }
    }
`;