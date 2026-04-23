import { gql } from '@apollo/client';

export const GET_FOOTER_MENU = gql`
  query FooterMenu {
    menu(id: "footer", idType: NAME) {
      menuItems {
        nodes {
          id
          label
          url
          target
        }
      }
    }
  }`;

export const GET_MAIN_MENU = gql`
  query MainMenu {
    menu(id: "main", idType: NAME) {
      menuItems {
        nodes {
          id
          label
          url
          target
        }
      }
    }
  }`;
