import { gql } from '@apollo/client';

export const GET_ALL_ATTRIBUTES = gql`
    query NewQuery {
      attributes {
        nodes {
          title
        }
      }
    }
  `;
