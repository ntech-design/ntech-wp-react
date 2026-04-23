import { gql } from '@apollo/client';

export const GET_INFO = gql`
  query SiteInfo {
    generalSettings {
      title
      description
      url
    }
  }
`;

export const GET_PAGE_WITH_POSTS = gql`
  query GetPage($pageId: ID!, $category: String!) {
    page(id: $pageId, idType: URI) {
      title
      slug
      content
      wpTemplate

      editorBlocks(flat: false) {
        __typename
        name
        clientId
        parentClientId
        renderedHtml

        ... on CoreHeading { attributes { content level } }
        ... on CoreParagraph { attributes { content } }
        ... on CoreGallery {
          attributes { columns align sizeSlug linkTo }
          innerBlocks {
            __typename
            ... on CoreImage { attributes { id url alt caption width height } }
          }
        }
        ... on CoreImage { attributes { id url alt caption width height } }
        ... on CoreColumns { 
          attributes { isStackedOnMobile }
          innerBlocks { __typename name clientId renderedHtml }
        }
        ... on CoreColumn {
          attributes { width verticalAlignment }
          innerBlocks { __typename name clientId renderedHtml }
        }
        ... on CoreList {
          attributes { ordered className }
          innerBlocks { __typename name clientId renderedHtml }
        }
        ... on CoreListItem {
          attributes { content className }
          innerBlocks { __typename name clientId renderedHtml }
        }
        ... on CoreButton { attributes { text url linkTarget rel } }
        ... on CoreEmbed { attributes { url providerNameSlug align } }
      }
    }

    posts(where: { categoryName: $category }) {
      nodes {
        id
        title
        slug
        content
        categories { nodes { slug } }
        postLayout { placement }

        editorBlocks(flat: false) {
          __typename
          name
          clientId
          parentClientId
          renderedHtml

          ... on CoreHeading { attributes { content level } }
          ... on CoreParagraph { attributes { content } }
          ... on CoreGallery {
            attributes { columns align sizeSlug linkTo }
            innerBlocks {
              __typename
              ... on CoreImage { attributes { id url alt caption width height } }
            }
          }
          ... on CoreImage { attributes { id url alt caption width height } }
          ... on CoreColumns {
            attributes { isStackedOnMobile }
            innerBlocks { __typename name clientId renderedHtml }
          }
          ... on CoreColumn {
            attributes { width verticalAlignment }
            innerBlocks { __typename name clientId renderedHtml }
          }
          ... on CoreList {
            attributes { ordered className }
            innerBlocks { __typename name clientId renderedHtml }
          }
          ... on CoreListItem {
            attributes { content className }
            innerBlocks { __typename name clientId renderedHtml }
          }
          ... on CoreButton { attributes { text url linkTarget rel } }
          ... on CoreEmbed { attributes { url providerNameSlug align } }
        }
      }
    }
  }
`;
